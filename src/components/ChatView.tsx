import React, { useState, useRef, useEffect } from 'react';
// === Injected: Real P2P functionality ===
import { P2PManager } from '../p2p/P2PCore';
// === Native (Android) bridge usage ===
import { Capacitor } from '@capacitor/core';
import { BluetoothMesh, WifiDirect } from '../native/native';

const isAndroid = Capacitor.getPlatform() === 'android';

const SIGNAL_URL = import.meta.env.VITE_SIGNAL_URL || 'ws://localhost:8765';


import { 
  Send, 
  Paperclip, 
  Mic, 
  Video, 
  Phone, 
  MoreVertical,
  Smile,
  Image,
  File,
  Download,
  Shield,
  Wifi,
  WifiOff,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Forward,
  Rewind
} from 'lucide-react';

interface ChatViewProps {
  isDark: boolean;
  selectedChat: string;
  onSelectChat: (chatId: string) => void;
}

const chatData = {
  alice: {
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    isSecure: true,
    connectionType: 'Wi-Fi Direct',
    messages: [
      { id: 1, text: 'Hey! How are you?', sent: false, time: '10:30 AM', type: 'text', encrypted: true },
      { id: 2, text: 'I\'m good, thanks! Working on the offline mesh project', sent: true, time: '10:32 AM', type: 'text', encrypted: true },
      { id: 3, text: 'That sounds exciting! Can you send me the latest files?', sent: false, time: '10:35 AM', type: 'text', encrypted: true },
      { id: 4, text: '', sent: true, time: '10:36 AM', type: 'file', fileName: 'project_docs.pdf', fileSize: '2.4 MB', encrypted: true, transferProgress: 100 },
      { id: 5, text: 'Perfect! Let me know if you need anything else', sent: true, time: '10:37 AM', type: 'text', encrypted: true },
      { id: 6, text: '', sent: false, time: '10:40 AM', type: 'voice', duration: '0:45', encrypted: true },
      { id: 7, text: '', sent: true, time: '10:42 AM', type: 'image', fileName: 'network_diagram.png', fileSize: '856 KB', encrypted: true, transferProgress: 100 }
    ]
  },
  bob: {
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    isSecure: true,
    connectionType: 'Bluetooth',
    messages: [
      { id: 1, text: 'The file transfer is complete!', sent: false, time: '9:15 AM', type: 'text', encrypted: true },
      { id: 2, text: 'Great! Thanks for sending those photos', sent: true, time: '9:16 AM', type: 'text', encrypted: true },
      { id: 3, text: '', sent: false, time: '9:18 AM', type: 'file', fileName: 'backup_data.zip', fileSize: '125 MB', encrypted: true, transferProgress: 78 }
    ]
  },
  team: {
    name: 'Project Team',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=100&h=100&fit=crop&crop=face',
    online: false,
    isSecure: true,
    connectionType: 'Mesh Network',
    messages: [
      { id: 1, text: 'Meeting starts in 10 minutes', sent: false, time: '2:50 PM', type: 'text', encrypted: true },
      { id: 2, text: 'I\'ll be there!', sent: true, time: '2:51 PM', type: 'text', encrypted: true },
      { id: 3, text: 'Same here', sent: false, time: '2:52 PM', type: 'text', sender: 'Sarah', encrypted: true }
    ]
  }
};

export default function ChatView({ isDark, selectedChat }: ChatViewProps) {
  
  // P2P manager
  const [roomId, setRoomId] = useState<string>('demo-room');
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const p2pRef = useRef<P2PManager | null>(null);

  const connect = async () => {
    if (!p2pRef.current) {
      p2pRef.current = new P2PManager(SIGNAL_URL);
      p2pRef.current.on('message', (m: string) => setMessages(prev => [...prev, m]));
    }
    await p2pRef.current.connect(roomId);
    setConnected(true);
  };
  const disconnect = () => { p2pRef.current?.disconnect(); setConnected(false); };
  const sendMsg = async (text: string) => {
    if (isAndroid) {
  try {
    await WifiDirect.sendMessage({ payload: { text } });
  } catch (e) {
    try { await BluetoothMesh.sendMessage({ deviceId: 'broadcast', payload: { text } }); } catch {}
  }
} else {
  p2pRef.current?.send(text);
}
setMessages(prev => [...prev, text]);

  };

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentChat = chatData[selectedChat as keyof typeof chatData] || chatData.alice;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would normally send the message through the mesh network
      setMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
  };

  const playVoiceMessage = (messageId: number) => {
    if (playingVoice === messageId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(messageId);
      // Here you would implement actual voice playback
      setTimeout(() => {
        setPlayingVoice(null);
      }, 3000);
    }
  };

  const getConnectionIcon = () => {
    if (currentChat.connectionType?.includes('Wi-Fi')) {
      return <Wifi className="w-4 h-4 text-green-500" />;
    }
    return <WifiOff className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Enhanced Chat Header */}
      <div className={`px-6 py-4 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={currentChat.avatar}
                alt={currentChat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {currentChat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentChat.name}
                </h3>
                {currentChat.isSecure && (
                  <Shield className="w-4 h-4 text-green-500" title="End-to-end encrypted" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentChat.online ? 'Online' : 'Last seen 2h ago'}
                </p>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>•</span>
                <div className="flex items-center space-x-1">
                  {getConnectionIcon()}
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {currentChat.connectionType}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Phone className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Video className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className={`flex-1 overflow-y-auto px-6 py-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          {currentChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.sent ? 'order-2' : 'order-1'}`}>
                {msg.type === 'text' && (
                  <div
                    className={`px-4 py-2 rounded-2xl relative ${
                      msg.sent
                        ? 'bg-indigo-500 text-white'
                        : `${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`
                    } shadow-sm`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    {msg.encrypted && (
                      <Shield className="absolute -top-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                )}
                
                {msg.type === 'file' && (
                  <div
                    className={`px-4 py-3 rounded-2xl relative ${
                      msg.sent
                        ? 'bg-indigo-500 text-white'
                        : `${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`
                    } shadow-sm`}
                  >
                    <div className="flex items-center space-x-3">
                      <File className="w-6 h-6" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{msg.fileName}</p>
                        <p className="text-xs opacity-75">{msg.fileSize}</p>
                        {msg.transferProgress !== undefined && msg.transferProgress < 100 && (
                          <div className="w-full bg-white bg-opacity-20 rounded-full h-1 mt-1">
                            <div
                              className="bg-white h-1 rounded-full transition-all duration-300"
                              style={{ width: `${msg.transferProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <button className="p-1 hover:bg-opacity-20 hover:bg-white rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    {msg.encrypted && (
                      <Shield className="absolute -top-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                )}

                {msg.type === 'voice' && (
                  <div
                    className={`px-4 py-3 rounded-2xl relative ${
                      msg.sent
                        ? 'bg-indigo-500 text-white'
                        : `${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`
                    } shadow-sm`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => playVoiceMessage(msg.id)}
                        className="p-1 hover:bg-opacity-20 hover:bg-white rounded"
                      >
                        {playingVoice === msg.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex space-x-1 items-center">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-white transition-all duration-100 ${
                                playingVoice === msg.id && i < 10 ? 'h-4 opacity-60' : 'h-2 opacity-40'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs opacity-75 mt-1">{msg.duration}</p>
                      </div>
                    </div>
                    {msg.encrypted && (
                      <Shield className="absolute -top-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                )}

                {msg.type === 'image' && (
                  <div
                    className={`p-2 rounded-2xl relative ${
                      msg.sent
                        ? 'bg-indigo-500'
                        : `${isDark ? 'bg-gray-700' : 'bg-white'}`
                    } shadow-sm`}
                  >
                    <div className={`w-48 h-32 rounded-lg flex items-center justify-center ${
                      isDark ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      <Image className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex items-center justify-between mt-2 px-2">
                      <div>
                        <p className={`text-xs font-medium ${msg.sent ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>
                          {msg.fileName}
                        </p>
                        <p className={`text-xs ${msg.sent ? 'text-white opacity-75' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {msg.fileSize}
                        </p>
                      </div>
                      <button className={`p-1 hover:bg-opacity-20 hover:bg-white rounded ${msg.sent ? 'text-white' : isDark ? 'text-white' : 'text-gray-700'}`}>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    {msg.encrypted && (
                      <Shield className="absolute -top-1 -right-1 w-3 h-3 text-green-500 bg-white rounded-full p-0.5" />
                    )}
                  </div>
                )}
                
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'} ${msg.sent ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                  {msg.sender && !msg.sent && (
                    <span className="ml-2 font-medium">{msg.sender}</span>
                  )}
                  {msg.encrypted && (
                    <span className="ml-2 text-green-500">🔒</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className={`px-4 py-2 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Message Input */}
      <div className={`px-6 py-4 border-t ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className={`border rounded-2xl p-3 ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleFileUpload}
                  className={`p-1 rounded hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className={`flex-1 bg-transparent resize-none focus:outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
                />
                <button className={`p-1 rounded hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Smile className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoiceRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : `${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() && !isRecording}
              className={`p-3 rounded-full transition-colors ${
                message.trim() || isRecording
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center mt-3">
          <div className="flex items-center space-x-2 text-xs">
            <Shield className="w-3 h-3 text-green-500" />
            <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              End-to-end encrypted • Connected via {currentChat.connectionType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChatView }