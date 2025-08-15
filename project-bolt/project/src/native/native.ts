import { registerPlugin } from '@capacitor/core';

export interface MessagePayload { text?: string; bytesBase64?: string; }
export interface DeviceInfo { id: string; name?: string; rssi?: number; }
export interface TransferProgress { id: string; sentBytes: number; totalBytes: number; }

export interface BluetoothMeshPlugin {
  isEnabled(): Promise<{ enabled: boolean }>;
  enable(): Promise<void>;
  scan(params: { seconds: number }): Promise<{ devices: DeviceInfo[] }>;
  connect(params: { deviceId: string }): Promise<{ connected: boolean }>;
  disconnect(params: { deviceId: string }): Promise<void>;
  sendMessage(params: { deviceId: string, payload: MessagePayload }): Promise<void>;
  sendFile(params: { deviceId: string, base64: string, name: string }): Promise<void>;
  onMessageReceived: (listener: (data: { from: string, payload: MessagePayload }) => void) => Promise<string>;
  removeAllListeners(): Promise<void>;
}

export interface WifiDirectPlugin {
  discoverPeers(): Promise<{ peers: DeviceInfo[] }>;
  createGroup(): Promise<{ groupOwner: boolean, ownerAddress?: string }>;
  connect(params: { deviceId: string }): Promise<{ connected: boolean, groupOwner?: boolean, ownerAddress?: string }>;
  sendMessage(params: { payload: MessagePayload }): Promise<void>;
  sendFile(params: { base64: string, name: string }): Promise<void>;
  onMessageReceived: (listener: (data: { from: string, payload: MessagePayload }) => void) => Promise<string>;
  removeAllListeners(): Promise<void>;
}

export const BluetoothMesh = registerPlugin<BluetoothMeshPlugin>('BluetoothMesh');
export const WifiDirect = registerPlugin<WifiDirectPlugin>('WifiDirect');
