# esp32-laudspeaker-system

Digital Laudspeaker Management System using ESP32-S3 with WiFi, dashboard, scheduling, and device command control.

## Features
- ESP32-S3 firmware with WiFi registration to a central management service
- Device status monitoring and zone assignment
- Web dashboard for announcements, schedules, and device health
- Control API for sending audio or announcement commands
- Tone-generation support for speaker test and basic audio playback

## Architecture
- `firmware/` contains the ESP32-S3 firmware code
- `server.js` runs the management API and dashboard backend
- `web/` contains the dashboard frontend
- `data/store.json` stores devices, zones, schedule, and announcements

## Quick start

1. Install Node.js 18+
2. In the project folder, run:

```bash
npm install
npm start
```

3. Open the dashboard in your browser:

```text
http://localhost:3000
```

## ESP32-S3 firmware

Open the file in `firmware/esp32_laudspeaker_system.ino` using Arduino IDE and replace the WiFi credentials in `firmware/wifi_config.h` before uploading.

## Main APIs

- `GET /api/health` - service health
- `GET /api/devices` - list all devices
- `POST /api/device/register` - device registration from ESP32
- `GET /api/zones` - read zones
- `POST /api/announce` - queue a new announcement
- `GET /api/schedule` - read schedules
- `POST /api/device/command` - send commands to a device

## Default dashboard

The dashboard supports:
- device online/offline cards
- announcement queue
- schedule list
- quick speaker test actions
- zone and device status overview

## Example device command payload

```json
{
  "deviceId": "LDS-001",
  "command": "play",
  "value": "Good morning"
}
```

## Notes

This project is designed as a practical prototype for a campus, office, or facility speaker management system. It provides a solid base for expansion with real audio file playback, database persistence, role-based admin login, and MQTT or WebSocket communication.
