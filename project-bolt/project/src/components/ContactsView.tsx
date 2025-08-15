import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  UserPlus, 
  MessageSquare, 
  Phone, 
  Video,
  MoreVertical,
  Users,
  Wifi
} from 'lucide-react';

interface ContactsViewProps {
  isDark: boolean;
}

const contacts = [
  {
    id: 'alice',
    name: 'Alice Johnson',
    status: 'Available for chat',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    distance: '15m',
    connectionType: 'Wi-Fi Direct'
  },
  {
    id: 'bob',
    name: 'Bob Smith',
    status: 'In a meeting',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    distance: '8m',
    connectionType: 'Bluetooth'
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    status: 'Away',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    online: false,
    distance: '45m',
    connectionType: 'Mesh'
  },
  {
    id: 'mike',
    name: 'Mike Wilson',
    status: 'Busy',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    distance: '2m',
    connectionType: 'Wi-Fi Direct'
  },
  {
    id: 'emma',
    name: 'Emma Davis',
    status: 'Available',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face',
    online: true,
    distance: '32m',
    connectionType: 'Mesh'
  }
];

const nearbyDevices = [
  {
    id: 'device1',
    name: 'Unknown Device',
    deviceType: 'Android Phone',
    distance: '5m',
    strength: 'Strong'
  },
  {
    id: 'device2',
    name: 'John\'s Laptop',
    deviceType: 'Windows PC',
    distance: '12m',
    strength: 'Medium'
  },
  {
    id: 'device3',
    name: 'Conference Room Hub',
    deviceType: 'IoT Device',
    distance: '25m',
    strength: 'Weak'
  }
];

export default function ContactsView({ isDark }: ContactsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'nearby'>('contacts');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'available for chat':
        return 'text-green-500';
      case 'busy':
        return 'text-red-500';
      case 'away':
        return 'text-yellow-500';
      case 'in a meeting':
        return 'text-red-500';
      default:
        return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getConnectionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bluetooth':
        return '📶';
      case 'wi-fi direct':
        return '📡';
      case 'mesh':
        return '🕸️';
      default:
        return '🔗';
    }
  };

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'bg-indigo-500 text-white'
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
            }`}
          >
            My Contacts ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'nearby'
                ? 'bg-indigo-500 text-white'
                : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
            }`}
          >
            Nearby Devices ({nearbyDevices.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'contacts' ? (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {contact.name}
                      </h3>
                      <p className={`text-sm ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {getConnectionIcon(contact.connectionType)} {contact.connectionType}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          • {contact.distance} away
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Video className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-center space-x-3">
                <Wifi className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Auto-Discovery Active</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Scanning for nearby devices...
                  </p>
                </div>
              </div>
            </div>
            
            {nearbyDevices.map((device) => (
              <div
                key={device.id}
                className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Users className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {device.name}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {device.deviceType} • {device.distance} away
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          device.strength === 'Strong' ? 'bg-green-500' :
                          device.strength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {device.strength} signal
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}