
// Simple local signaling server (no internet required if on same LAN)
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = new Map(); // roomId -> Set(ws)

function joinRoom(roomId, ws) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws._roomId = roomId;
}

function leaveRoom(ws) {
  const roomId = ws._roomId;
  if (!roomId) return;
  const set = rooms.get(roomId);
  if (set) {
    set.delete(ws);
    if (set.size === 0) rooms.delete(roomId);
  }
  ws._roomId = null;
}

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === 'join') {
        joinRoom(msg.room, ws);
        ws.send(JSON.stringify({ type: 'joined', room: msg.room }));
        return;
      }
      const roomId = ws._roomId;
      if (!roomId) return;
      // Relay to others in room
      for (const peer of rooms.get(roomId) || []) {
        if (peer !== ws && peer.readyState === WebSocket.OPEN) {
          peer.send(JSON.stringify({ ...msg, sender: msg.sender || 'peer' }));
        }
      }
    } catch (e) {
      console.error('Failed to handle message', e);
    }
  });
  ws.on('close', () => leaveRoom(ws));
});

app.get('/', (_, res) => res.send('Local Signaling Server OK'));

const PORT = process.env.PORT || 8765;
server.listen(PORT, () => {
  console.log(`Signaling server listening on :${PORT}`);
});
