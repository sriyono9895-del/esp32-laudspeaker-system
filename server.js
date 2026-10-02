const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'store.json');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'web')));

function readStore() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
}

function buildDeviceSummary(device) {
  return {
    id: device.id,
    name: device.name,
    ip: device.ip,
    status: device.status,
    zone: device.zone,
    volume: device.volume,
    temperature: device.temperature,
    uptime: device.uptime,
    lastSeen: device.lastSeen
  };
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'esp32-laudspeaker-system',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/devices', (req, res) => {
  const store = readStore();
  res.json(store.devices.map(buildDeviceSummary));
});

app.post('/api/device/register', (req, res) => {
  const store = readStore();
  const payload = req.body || {};

  if (!payload.id || !payload.name || !payload.ip) {
    return res.status(400).json({ error: 'id, name, and ip are required' });
  }

  const exists = store.devices.find((device) => device.id === payload.id);

  if (exists) {
    exists.name = payload.name || exists.name;
    exists.ip = payload.ip || exists.ip;
    exists.zone = payload.zone || exists.zone;
    exists.status = 'online';
    exists.lastSeen = new Date().toISOString();
    exists.volume = payload.volume ?? exists.volume;
    exists.temperature = payload.temperature ?? exists.temperature;
    exists.uptime = payload.uptime ?? exists.uptime;
  } else {
    store.devices.push({
      id: payload.id,
      name: payload.name,
      ip: payload.ip,
      status: 'online',
      zone: payload.zone || 'Unassigned',
      volume: payload.volume || 70,
      temperature: payload.temperature || 0,
      uptime: payload.uptime || 0,
      lastSeen: new Date().toISOString()
    });
  }

  writeStore(store);
  res.json({ ok: true, deviceId: payload.id });
});

app.get('/api/zones', (req, res) => {
  const store = readStore();
  res.json(store.zones);
});

app.post('/api/zones', (req, res) => {
  const store = readStore();
  const zone = { ...req.body, id: req.body.id || `zone-${Date.now()}` };
  store.zones.push(zone);
  writeStore(store);
  res.status(201).json(zone);
});

app.get('/api/schedule', (req, res) => {
  const store = readStore();
  res.json(store.schedule);
});

app.post('/api/schedule', (req, res) => {
  const store = readStore();
  const entry = {
    id: Date.now(),
    ...req.body
  };
  store.schedule.push(entry);
  writeStore(store);
  res.status(201).json(entry);
});

app.get('/api/announcements', (req, res) => {
  const store = readStore();
  res.json(store.announcements);
});

app.post('/api/announce', (req, res) => {
  const store = readStore();
  const payload = req.body || {};

  const announcement = {
    id: Date.now(),
    text: payload.text || 'System announcement',
    zone: payload.zone || 'Gate',
    priority: payload.priority || 'normal',
    scheduledAt: new Date().toISOString(),
    status: 'queued'
  };

  store.announcements.push(announcement);
  writeStore(store);

  res.status(201).json({ ok: true, announcement });
});

app.post('/api/device/command', async (req, res) => {
  const payload = req.body || {};
  const { deviceId, command, value } = payload;

  if (!deviceId || !command) {
    return res.status(400).json({ error: 'deviceId and command are required' });
  }

  const store = readStore();
  const device = store.devices.find((entry) => entry.id === deviceId);

  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  const response = {
    ok: true,
    deviceId,
    command,
    value,
    ip: device.ip,
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Laudspeaker management system running on http://localhost:${PORT}`);
});
