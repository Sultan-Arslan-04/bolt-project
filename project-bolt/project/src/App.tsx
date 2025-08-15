import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import ContactsView from './components/ContactsView';
import CallsView from './components/CallsView';
import { FileManager } from './components/FileManager';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import NetworkView from './components/NetworkView';

export type ViewType = 'chat' | 'devices' | 'calls' | 'files' | 'mesh' | 'settings' | 'profile';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('chat');
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isCallActive={isCallActive}
      />
      
      <div className="flex-1 flex">
        {activeView === 'chat' && (
          <ChatView 
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setIsCallActive={setIsCallActive}
          />
        )}
        {activeView === 'devices' && <ContactsView isDark={isDark} />}
        {activeView === 'calls' && <CallsView setIsCallActive={setIsCallActive} />}
        {activeView === 'files' && <FileManager isDark={isDark} />}
        {activeView === 'mesh' && <NetworkView isDark={isDark} networkDevices={12} />}
        {activeView === 'settings' && <Settings isDark={isDark} />}
        {activeView === 'profile' && <Profile isDark={isDark} />}
      </div>
    </div>
  );
}

export default App;