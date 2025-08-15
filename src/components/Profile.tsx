import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Camera, 
  Shield, 
  Wifi, 
  Battery, 
  HardDrive,
  Activity,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

interface ProfileProps {
  isDark?: boolean;
}

export function Profile({ isDark = true }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('John Doe');
  const [status, setStatus] = useState('Available for chat');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const profileStats = [
    { label: 'Messages Sent', value: '1,247', icon: Activity },
    { label: 'Files Shared', value: '89', icon: HardDrive },
    { label: 'Calls Made', value: '156', icon: Activity },
    { label: 'Network Uptime', value: '98.5%', icon: Wifi }
  ];

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className={`p-6 rounded-xl border mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`text-2xl font-bold bg-transparent border-b-2 border-indigo-500 focus:outline-none ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  />
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`bg-transparent border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {displayName}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    {status}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Online
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Encrypted
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {profileStats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <div>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Device Information */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Device Information
            </h2>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAdvanced ? 'Simple' : 'Advanced'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Connection Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Wi-Fi Direct
                  </span>
                  <span className="text-sm text-green-500">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Bluetooth
                  </span>
                  <span className="text-sm text-green-500">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mesh Network
                  </span>
                  <span className="text-sm text-blue-500">Relay Node</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                System Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Battery Level
                  </span>
                  <span className="text-sm text-green-500">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Storage Used
                  </span>
                  <span className="text-sm text-yellow-500">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Network Load
                  </span>
                  <span className="text-sm text-blue-500">35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Privacy & Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  End-to-End Encryption
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  AES-256 Active
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Local Storage Only
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No Cloud Sync
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Zero Tracking
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Complete Privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}