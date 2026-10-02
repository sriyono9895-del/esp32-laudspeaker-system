* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b1020;
  color: #edf2ff;
}

button,
input,
select,
textarea {
  font: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #111827, #0f172a);
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  padding: 24px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #60a5fa, #8b5cf6);
  font-weight: 700;
}

.brand h1,
.brand p {
  margin: 0;
}

.brand p {
  font-size: 12px;
  color: #94a3b8;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  border: none;
  border-radius: 12px;
  background: transparent;
  text-align: left;
  color: #dbeafe;
  padding: 12px 14px;
  cursor: pointer;
}

.nav-item.active {
  background: rgba(96, 165, 250, 0.14);
  color: #93c5fd;
}

.main-panel {
  flex: 1;
  padding: 28px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #60a5fa;
  font-size: 11px;
}

.topbar h2 {
  margin: 6px 0 0;
}

.primary-button,
.secondary-button {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px 14px;
  font-weight: 600;
}

.primary-button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.secondary-button {
  background: rgba(148, 163, 184, 0.15);
  color: #e2e8f0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card,
.panel {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  padding: 18px;
}

.stat-card span {
  display: block;
  color: #94a3b8;
  margin-bottom: 10px;
}

.stat-card strong {
  font-size: 28px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  margin-bottom: 20px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.device-list,
.announcement-list,
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.device-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.65);
  border-radius: 12px;
  padding: 12px 14px;
}

.device-info h4,
.device-info p,
.announcement-item p,
.schedule-item p {
  margin: 0;
}

.device-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(16, 185, 129, 0.12);
  color: #6ee7b7;
}

.device-status.offline {
  background: rgba(248, 113, 113, 0.12);
  color: #fca5a5;
}

.device-meta {
  color: #94a3b8;
  font-size: 12px;
  margin-top: 4px;
}

.announcement-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.announcement-form select,
.announcement-form textarea {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  color: #e2e8f0;
  padding: 10px 12px;
}

.announcement-item,
.schedule-item {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(15, 23, 42, 0.65);
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(96, 165, 250, 0.14);
  color: #bfdbfe;
}

.lower-panel {
  margin-top: 10px;
}

@media (max-width: 900px) {
  .app-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  }

  .stats-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }
}
