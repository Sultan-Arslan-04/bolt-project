# APK via GitHub Actions + Native Radios (No Internet)

- **No internet or cloud** is used for communication.
- Uses device radios **locally**:
  - **Bluetooth Classic/LE** for nearby messaging/file transfer.
  - **Wi‑Fi Direct (Wi‑Fi P2P)** for higher bandwidth peer links without any router/Internet.
- Note: **802.11p (DSRC)** is generally **not supported** on consumer Android devices. If your hardware/ROM supports it, a separate native module would be required. As a practical alternative, use **Wi‑Fi Direct** or **Wi‑Fi Aware (NAN)**.

## Build APK on GitHub
1. Push this repo to GitHub.
2. Ensure default branch is `main` or `master`.
3. Go to **Actions** → run **Android APK (Capacitor)** workflow.
4. Download artifact **OffGridTalk-debug-apk** after the run completes.

## Local Development
- Run `npm run dev` to test the UI.
- For Android packaging, you will need to run `npx cap add android` once locally to generate `/project/android`, commit it, and push. Otherwise the workflow runs those commands dynamically in CI.

## Native Modules
This project defines Capacitor plugin interfaces for:
- `BluetoothMesh` (Bluetooth Classic/LE transport)
- `WifiDirect` (Wi‑Fi Direct transport)

> Implementations are device-native (Kotlin) and must be added inside `project/android` once generated. The TypeScript bridge is already provided at `src/native/native.ts`.
