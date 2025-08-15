
// Minimal P2P core using WebRTC + local WebSocket signaling
// Works on LAN without internet when signaling server runs locally.
type Listener = (...args: any[]) => void;

export class P2PManager {
  private ws?: WebSocket;
  private pc?: RTCPeerConnection;
  private dc?: RTCDataChannel;
  private roomId: string = "";
  private listeners: Record<string, Listener[]> = {};
  private localStream?: MediaStream;
  private remoteStream?: MediaStream;

  constructor(private signalUrl: string) {}

  on(event: string, cb: Listener) {
    (this.listeners[event] ||= []).push(cb);
  }
  private emit(event: string, ...args: any[]) {
    for (const cb of this.listeners[event] || []) cb(...args);
  }

  async connect(roomId: string) {
    this.roomId = roomId;
    this.ws = new WebSocket(this.signalUrl);
    await new Promise<void>((res) => {
      this.ws!.onopen = () => res();
    });
    this.ws.onmessage = (ev) => this.handleSignal(JSON.parse(ev.data));
    this.ws.onclose = () => this.emit('signal-close');
    this.ws.send(JSON.stringify({ type: 'join', room: roomId }));
    await this.createPeer();
    // Create offer if first to join
    setTimeout(async () => {
      if (!this.pc) return;
      if (this.pc.signalingState === 'stable') {
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        this.ws!.send(JSON.stringify({ type: 'sdp', sdp: offer }));
      }
    }, 300);
  }

  private async createPeer() {
    this.pc = new RTCPeerConnection({
      iceServers: [], // no internet/STUN
    });
    this.pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.ws?.send(JSON.stringify({ type: 'ice', candidate: e.candidate }));
      }
    };
    this.pc.ontrack = (e) => {
      this.remoteStream = e.streams[0];
      this.emit('remote-stream', this.remoteStream);
    };
    this.dc = this.pc.createDataChannel('chat');
    this.dc.onmessage = (e) => this.emit('message', e.data);
    (this.pc as any).ondatachannel = (e: RTCDataChannelEvent) => {
      this.dc = e.channel;
      this.dc.onmessage = (ev) => this.emit('message', ev.data);
    };
  }

  private async handleSignal(msg: any) {
    if (msg.type === 'sdp') {
      if (!this.pc) await this.createPeer();
      await this.pc!.setRemoteDescription(msg.sdp);
      if (msg.sdp.type === 'offer') {
        const answer = await this.pc!.createAnswer();
        await this.pc!.setLocalDescription(answer);
        this.ws!.send(JSON.stringify({ type: 'sdp', sdp: answer }));
      }
    } else if (msg.type === 'ice') {
      try { await this.pc?.addIceCandidate(msg.candidate); } catch {}
    }
  }

  send(text: string) {
    this.dc?.send(text);
  }

  async sendFile(file: File) {
    const chunkSize = 16 * 1024;
    const reader = file.stream().getReader();
    this.send(JSON.stringify({ fileMeta: { name: file.name, size: file.size } }));
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      this.dc?.send(value);
    }
    this.dc?.send('FILE_EOF');
  }

  async startMedia(kind: 'audio' | 'video') {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true, video: kind === 'video'
    });
    this.localStream.getTracks().forEach(t => this.pc?.addTrack(t, this.localStream!));
    this.emit('local-stream', this.localStream);
  }

  stopMedia() {
    this.localStream?.getTracks().forEach(t => t.stop());
  }

  disconnect() {
    this.ws?.close();
    this.pc?.close();
  }
}
