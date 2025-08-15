import React from 'react';
import SettingsView from './SettingsView';

interface SettingsProps {
  isDark?: boolean;
}

export function Settings({ isDark = true }: SettingsProps) {
  return <SettingsView isDark={isDark} />;
}