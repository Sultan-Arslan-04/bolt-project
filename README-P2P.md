# Off-Grid Talk — Functional P2P (No Internet Required)

This update adds **real working features** on top of your existing UI:

- Local **WebSocket signaling server** (`signaling-server/`) to exchange SDP/ICE between peers.
- In-app **WebRTC DataChannel** for real-time messaging.
- **File transfer** via DataChannel (chunked).
- **Audio/Video calls** via WebRTC with `getUserMedia`.
- **All data stored locally** on devices (no cloud).

## How to run (LAN / No Internet)

1. On ONE device in the same Wi‑Fi/LAN, run the signaling server:
   ```bash
   cd signaling-server
   npm install
   npm start
   ```
   Note the server device's IP address, e.g. `192.168.0.10`.

2. In the app root, copy `.env.example` to `.env` and set:
   ```env
   VITE_SIGNAL_URL=ws://192.168.0.10:8765
   ```

3. Start the Vite app:
   ```bash
   npm install
   npm run dev
   ```

4. On all devices, open the app, enter the SAME **Room ID**, press **Connect** in Chat, and **Start Video** in Calls to begin a session.

## Notes
- This uses **no external servers** beyond the local signaling server (which can run on a phone/PC in the LAN). Once peers connect, media/data flows directly, end‑to‑end.
- For APK, wrap with **Capacitor** or **Cordova**; no extra code changes needed.
- Mesh/Bluetooth/Wi‑Fi Direct are not included here (browsers restrict those). For native Android mesh/Bluetooth, implement in your mobile shell and bridge into the WebView.
