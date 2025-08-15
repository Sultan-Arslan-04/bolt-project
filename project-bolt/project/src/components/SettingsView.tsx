import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  Wifi, 
  Bell, 
  Moon, 
  Volume2,
  Battery,
  HardDrive,
  Users,
  FileText,
  Info,
  ChevronRight,
  Toggle
} from 'lucide-react';

interface SettingsViewProps {
  isDark: boolean;
}

export default function SettingsView({ isDark }: SettingsViewProps) {
  const [notifications, setNotifications] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [meshMode, setMeshMode] = useState(true);
  const [encryption, setEncryption] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-indigo-500' : `${isDark ? 'bg-gray-600' : 'bg-gray-300'}`
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    action, 
    showChevron = false,
    onClick 
  }: {
    icon: any;
    title: string;
    description: string;
    action?: React.ReactNode;
    showChevron?: boolean;
    onClick?: () => void;
  }) => (
    <div
      className={`p-4 rounded-xl border transition-colors ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          <div>
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {action}
          {showChevron && (
            <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Security & Privacy */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Security & Privacy
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={Shield}
              title="End-to-End Encryption"
              description="All messages and files are encrypted with AES-256"
              action={
                <ToggleSwitch 
                  enabled={encryption} 
                  onChange={() => setEncryption(!encryption)} 
                />
              }
            />
            <SettingItem
              icon={Key}
              title="Encryption Keys"
              description="Manage your encryption keys and security settings"
              showChevron
              onClick={() => {}}
            />
            <SettingItem
              icon={Lock}
              title="Privacy Settings"
              description="Control who can see your status and contact you"
              showChevron
              onClick={() => {}}
            />
            <SettingItem
              icon={HardDrive}
              title="Local Data Storage"
              description="All data stored locally on your device • 2.4 GB used"
              showChevron
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Connection & Network */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Connection & Network
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={Wifi}
              title="Auto-Connect"
              description="Automatically connect to nearby trusted devices"
              action={
                <ToggleSwitch 
                  enabled={autoConnect} 
                  onChange={() => setAutoConnect(!autoConnect)} 
                />
              }
            />
            <SettingItem
              icon={Smartphone}
              title="Mesh Networking"
              description="Act as a relay node to extend network range"
              action={
                <ToggleSwitch 
                  enabled={meshMode} 
                  onChange={() => setMeshMode(!meshMode)} 
                />
              }
            />
            <SettingItem
              icon={Battery}
              title="Power Management"
              description="Optimize battery usage for background operation"
              showChevron
              onClick={() => {}}
            />
            <SettingItem
              icon={Users}
              title="Device Sync"
              description="Synchronize data across your connected devices"
              action={
                <ToggleSwitch 
                  enabled={backgroundSync} 
                  onChange={() => setBackgroundSync(!backgroundSync)} 
                />
              }
            />
          </div>
        </div>

        {/* Notifications & Sound */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Notifications & Sound
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              description="Receive notifications for new messages and calls"
              action={
                <ToggleSwitch 
                  enabled={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                />
              }
            />
            <SettingItem
              icon={Volume2}
              title="Sound Settings"
              description="Customize notification sounds and call ringtones"
              showChevron
              onClick={() => {}}
            />
          </div>
        </div>

        {/* About & Legal */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About & Legal
          </h2>
          <div className="space-y-3">
            <SettingItem
              icon={Info}
              title="About OfflineConnect"
              description="Version 1.0.0 • Open source & privacy-focused"
              showChevron
              onClick={() => {}}
            />
            <SettingItem
              icon={FileText}
              title="Privacy Policy"
              description="Read our commitment to your privacy"
              showChevron
              onClick={() => {}}
            />
            <SettingItem
              icon={FileText}
              title="Terms of Service"
              description="Review the terms and conditions"
              showChevron
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Status Information */}
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-5 h-5 text-green-500" />
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Security Status: Active
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Encryption: <span className="text-green-500 font-medium">AES-256 Active</span>
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Network: <span className="text-blue-500 font-medium">12 Devices Connected</span>
              </p>
            </div>
            <div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Storage: <span className="text-amber-500 font-medium">Local Only</span>
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Privacy: <span className="text-green-500 font-medium">No Tracking</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}