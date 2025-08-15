import React from 'react';
import { MessageCircle, Users, Phone, FolderOpen, Network, Settings, User, Wifi } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isCallActive: boolean;
}

export function Sidebar({ activeView, setActiveView, isCallActive }: SidebarProps) {
  const menuItems = [
    { id: 'chat', icon: MessageCircle, label: 'Messages', count: 3 },
    { id: 'devices', icon: Users, label: 'Devices', count: 7 },
    { id: 'calls', icon: Phone, label: 'Calls', active: isCallActive },
    { id: 'files', icon: FolderOpen, label: 'Files' },
    { id: 'mesh', icon: Network, label: 'Network' },
  ];

  const bottomItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center">
          <Wifi className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex flex-col gap-4 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ViewType)}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              activeView === item.id
                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-400/25'
                : 'bg-white/5 hover:bg-white/10 hover:scale-105'
            }`}
          >
            <item.icon className={`w-6 h-6 ${
              activeView === item.id ? 'text-white' : 'text-gray-400'
            }`} />
            
            {item.count && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {item.count}
              </div>
            )}
            
            {item.active && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="flex flex-col gap-4">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ViewType)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              activeView === item.id
                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-400/25'
                : 'bg-white/5 hover:bg-white/10 hover:scale-105'
            }`}
          >
            <item.icon className={`w-6 h-6 ${
              activeView === item.id ? 'text-white' : 'text-gray-400'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}