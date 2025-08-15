import React, { useState, useRef, useEffect } from 'react';
import { P2PManager } from '../p2p/P2PCore';
const SIGNAL_URL = import.meta.env.VITE_SIGNAL_URL || 'ws://localhost:8765';
import { 
  Phone, 
  Video, 
  PhoneCall, 
  PhoneMissed, 
  PhoneIncoming, 
  PhoneOutgoing,
  Search,
  Plus,
  Users,
  Clock
} from 'lucide-react';

interface CallsViewProps {
  isDark: boolean;
}

const callHistory = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face',
    type: 'outgoing',
    callType: 'video',
    time: '2 min ago',
    duration: '15:30',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Project Team',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=100&h=100&fit=crop&crop=face',
    type: 'incoming',
    callType: 'video',
    time: '1 hour ago',
    duration: '45:12',
    status: 'completed',
    isGroup: true
  },
  {
    id: 3,
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
    type: 'missed',
    callType: 'audio',
    time: '3 hours ago',
    duration: '0:00',
    status: 'missed'
  },
  {
    id: 4,
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    type: 'outgoing',
    callType: 'audio',
    time: 'Yesterday',
    duration: '8:45',
    status: 'completed'
  },
  {
    id: 5,
    name: 'Mike Wilson',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face',
    type: 'incoming',
    callType: 'video',
    time: '2 days ago',
    duration: '22:15',
    status: 'completed'
  }
];

export default function CallsView({ isDark }: CallsViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'missed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'missed' && call.status === 'missed');
    return matchesSearch && matchesTab;
  });

  const getCallIcon = (type: string, status: string) => {
    if (status === 'missed') return <PhoneMissed className="w-4 h-4 text-red-500" />;
    if (type === 'incoming') return <PhoneIncoming className="w-4 h-4 text-green-500" />;
    if (type === 'outgoing') return <PhoneOutgoing className="w-4 h-4 text-blue-500" />;
    return <PhoneCall className="w-4 h-4" />;
  };

  const getCallTypeIcon = (callType: string) => {
    return callType === 'video' ? 
      <Video className="w-5 h-5" /> : 
      <Phone className="w-5 h-5" />;
  };

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6">
      <div className="flex gap-4 mb-4">
        <video ref={localRef} autoPlay muted className="w-1/2 rounded"/>
        <video ref={remoteRef} autoPlay className="w-1/2 rounded"/>
      </div>
      <div className="flex gap-2 mb-4">
        <input className="px-3 py-2 rounded bg-black/30 border outline-none" value={roomId} onChange={(e)=>setRoomId(e.target.value)} />
        <button onClick={startVideo} className="px-3 py-2 rounded bg-green-600">Start Video</button>
        <button onClick={endCall} className="px-3 py-2 rounded bg-red-600">End</button>
      </div>
        {/* Search and Actions */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search call history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <button className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Call</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
            isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Audio Call
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start voice call
                </p>
              </div>
            </div>
          </button>
          
          <button className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
            isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Video Call
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start video call
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-indigo-500 text-white'
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
            }`}
          >
            All Calls
          </button>
          <button
            onClick={() => setActiveTab('missed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'missed'
                ? 'bg-indigo-500 text-white'
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
            }`}
          >
            Missed Calls
          </button>
        </div>

        {/* Call History */}
        <div className="space-y-2">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={call.avatar}
                      alt={call.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {call.isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {call.name}
                      </h3>
                      {getCallIcon(call.type, call.status)}
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {call.time}
                      </p>
                      {call.duration !== '0:00' && (
                        <>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>•</span>
                          <div className="flex items-center space-x-1">
                            <Clock className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`} />
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                              {call.duration}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {getCallTypeIcon(call.callType)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCalls.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <PhoneCall className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No calls found</p>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms' : 'Your call history will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}