import React, { useState, useEffect } from 'react';
import { Wifi, Radio, Smartphone, Laptop, Server, Users, Signal, Shield, Zap, Activity, Globe, RefreshCw, Settings, Podcast as Broadcast, Router, Cpu, HardDrive, Battery, Download, Upload, Eye, EyeOff, Play, Pause, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface NetworkViewProps {
  isDark: boolean;
  networkDevices: number;
}

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'desktop' | 'router';
  avatar?: string;
  distance: string;
  signal: 'strong' | 'medium' | 'weak';
  protocol: string;
  status: 'connected' | 'connecting' | 'available' | 'offline';
  batteryLevel?: number;
  relayNode: boolean;
  dataTransferred: string;
  lastSeen: string;
}

interface NetworkStats {
  totalNodes: number;
  activeConnections: number;
  meshDepth: number;
  dataTransferred: string;
  uptime: string;
  encryption: boolean;
  networkLoad: number;
}

const mockDevices: Device[] = [
  {
    id: 'device1',
    name: 'Alice\'s iPhone',
    type: 'phone',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face',
    distance: '8m',
    signal: 'strong',
    protocol: 'Wi-Fi Direct',
    status: 'connected',
    batteryLevel: 85,
    relayNode: true,
    dataTransferred: '245 MB',
    lastSeen: 'Now'
  },
  {
    id: 'device2',
    name: 'Bob\'s MacBook',
    type: 'laptop',
    distance: '15m',
    signal: 'strong',
    protocol: 'LAN',
    status: 'connected',
    batteryLevel: 60,
    relayNode: true,
    dataTransferred: '1.2 GB',
    lastSeen: 'Now'
  },
  {
    id: 'device3',
    name: 'Conference Hub',
    type: 'router',
    distance: '25m',
    signal: 'medium',
    protocol: 'Mesh Bridge',
    status: 'connected',
    relayNode: true,
    dataTransferred: '4.8 GB',
    lastSeen: 'Now'
  },
  {
    id: 'device4',
    name: 'Sarah\'s Android',
    type: 'phone',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    distance: '45m',
    signal: 'weak',
    protocol: 'Bluetooth Mesh',
    status: 'connected',
    batteryLevel: 30,
    relayNode: false,
    dataTransferred: '89 MB',
    lastSeen: '2m ago'
  },
  {
    id: 'device5',
    name: 'Mike\'s Tablet',
    type: 'tablet',
    distance: '12m',
    signal: 'strong',
    protocol: 'Wi-Fi Direct',
    status: 'connecting',
    batteryLevel: 95,
    relayNode: false,
    dataTransferred: '0 MB',
    lastSeen: '5m ago'
  }
];

export default function NetworkView({ isDark, networkDevices }: NetworkViewProps) {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [activeTab, setActiveTab] = useState<'topology' | 'devices' | 'stats' | 'broadcast'>('topology');
  const [isScanning, setIsScanning] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalNodes: 12,
    activeConnections: 8,
    meshDepth: 4,
    dataTransferred: '8.4 GB',
    uptime: '2h 15m',
    encryption: true,
    networkLoad: 35
  });

  useEffect(() => {
    // Simulate real-time network updates
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        totalNodes: prev.totalNodes + Math.floor(Math.random() * 3) - 1,
        networkLoad: Math.max(10, Math.min(90, prev.networkLoad + Math.floor(Math.random() * 10) - 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Simulate finding new devices
      setNetworkStats(prev => ({ ...prev, totalNodes: prev.totalNodes + 1 }));
    }, 3000);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone': return Smartphone;
      case 'laptop': return Laptop;
      case 'tablet': return Smartphone;
      case 'desktop': return Cpu;
      case 'router': return Router;
      default: return Smartphone;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'strong': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'weak': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'available': return 'bg-blue-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const sendBroadcast = () => {
    if (broadcastMessage.trim()) {
      // Simulate broadcast
      setBroadcastMessage('');
      // You would implement actual broadcast logic here
    }
  };

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6">
        {/* Network Status Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {networkStats.totalNodes}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Nodes
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {networkStats.activeConnections}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Connections
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {networkStats.meshDepth}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Mesh Depth
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                networkStats.encryption ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  AES-256
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1">
            {['topology', 'devices', 'stats', 'broadcast'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-indigo-500 text-white'
                    : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAdvanced ? 'Simple' : 'Advanced'}</span>
            </button>
            
            <button
              onClick={startScan}
              disabled={isScanning}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Scan Network'}</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'topology' && (
          <div className={`rounded-xl border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Network Topology
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Relay Node</span>
                </div>
              </div>
            </div>

            {/* Simplified Network Visualization */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-8">
                {/* Central Node */}
                <div className="col-start-2 flex justify-center">
                  <div className={`relative p-4 rounded-xl border-2 border-indigo-500 ${
                    isDark ? 'bg-gray-700' : 'bg-indigo-50'
                  }`}>
                    <div className="text-center">
                      <Laptop className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Your Device
                      </p>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                {/* Connected Devices */}
                {devices.slice(0, 6).map((device, index) => {
                  const positions = [
                    'col-start-1 row-start-1', 'col-start-3 row-start-1',
                    'col-start-1 row-start-2', 'col-start-3 row-start-2',
                    'col-start-1 row-start-3', 'col-start-3 row-start-3'
                  ];
                  const DeviceIcon = getDeviceIcon(device.type);
                  
                  return (
                    <div key={device.id} className={positions[index] + ' flex justify-center'}>
                      <div className={`relative p-3 rounded-lg border ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}>
                        <div className="text-center">
                          <DeviceIcon className={`w-6 h-6 mx-auto mb-1 ${
                            device.status === 'connected' ? 'text-green-500' : 'text-gray-500'
                          }`} />
                          <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {device.name.split(' ')[0]}
                          </p>
                        </div>
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          getStatusColor(device.status)
                        }`}></div>
                        {device.relayNode && (
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connection Lines (simplified representation) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <pattern id="connectionLine" patternUnits="userSpaceOnUse" width="4" height="4">
                    <circle cx="2" cy="2" r="1" fill={isDark ? '#4B5563' : '#D1D5DB'} />
                  </pattern>
                </defs>
                {/* You would add actual connection lines here based on device positions */}
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="space-y-4">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.type);
              
              return (
                <div
                  key={device.id}
                  className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {device.avatar ? (
                          <img
                            src={device.avatar}
                            alt={device.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <DeviceIcon className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                          </div>
                        )}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          getStatusColor(device.status)
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {device.name}
                          </h3>
                          {device.relayNode && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Relay
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Signal className={`w-4 h-4 ${getSignalColor(device.signal)}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {device.protocol}
                            </span>
                          </div>
                          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {device.distance} • {device.dataTransferred}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {device.batteryLevel && (
                        <div className="flex items-center space-x-1">
                          <Battery className={`w-4 h-4 ${
                            device.batteryLevel > 50 ? 'text-green-500' :
                            device.batteryLevel > 20 ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {device.batteryLevel}%
                          </span>
                        </div>
                      )}
                      <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Network Performance */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Network Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Network Load
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {networkStats.networkLoad}%
                    </span>
                  </div>
                  <div className={`w-full bg-gray-300 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${networkStats.networkLoad}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Data Transferred
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {networkStats.dataTransferred}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Network Uptime
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {networkStats.uptime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol Distribution */}
            <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Connection Protocols
              </h3>
              <div className="space-y-3">
                {[
                  { protocol: 'Wi-Fi Direct', count: 5, color: 'bg-blue-500' },
                  { protocol: 'Bluetooth Mesh', count: 3, color: 'bg-green-500' },
                  { protocol: 'LAN', count: 2, color: 'bg-purple-500' },
                  { protocol: 'Mesh Bridge', count: 2, color: 'bg-yellow-500' }
                ].map((item) => (
                  <div key={item.protocol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.protocol}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.count} devices
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className={`p-6 rounded-xl border md:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Security & Encryption
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      AES-256 Encryption
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      All data encrypted
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Local Storage Only
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      No cloud dependencies
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Zero Tracking
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Complete privacy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'broadcast' && (
          <div className={`rounded-xl border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Broadcast className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Network Broadcast
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Send announcements to all connected devices
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Broadcast Message
                </label>
                <textarea
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Enter your announcement message..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Will reach {networkStats.totalNodes} devices
                  </span>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Encrypted
                    </span>
                  </div>
                </div>
                <button
                  onClick={sendBroadcast}
                  disabled={!broadcastMessage.trim()}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    broadcastMessage.trim()
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : `${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                  }`}
                >
                  Send Broadcast
                </button>
              </div>
            </div>

            {/* Recent Broadcasts */}
            <div className="mt-8">
              <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Broadcasts
              </h4>
              <div className="space-y-3">
                {[
                  { message: 'Meeting starting in conference room B in 10 minutes', time: '5 min ago', sender: 'You' },
                  { message: 'Wi-Fi network will be down for maintenance at 3 PM', time: '1 hour ago', sender: 'IT Admin' },
                  { message: 'Emergency evacuation drill scheduled for tomorrow', time: '3 hours ago', sender: 'Security' }
                ].map((broadcast, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "{broadcast.message}"
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        From {broadcast.sender}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {broadcast.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}