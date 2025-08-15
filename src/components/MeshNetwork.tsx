import React from 'react';
import NetworkView from './NetworkView';

interface MeshNetworkProps {
  isDark?: boolean;
}

export function MeshNetwork({ isDark = true }: MeshNetworkProps) {
  return <NetworkView isDark={isDark} networkDevices={12} />;
}