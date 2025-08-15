import React, { useState } from 'react';
import { 
  FolderOpen, 
  File, 
  Download, 
  Upload, 
  Share2, 
  Trash2, 
  Search,
  Grid,
  List,
  Filter,
  MoreVertical,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  HardDrive,
  Wifi,
  Clock
} from 'lucide-react';

interface FileManagerProps {
  isDark?: boolean;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  fileType?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  shared?: boolean;
  synced?: boolean;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Project Documents',
    type: 'folder',
    modified: '2 hours ago',
    shared: true
  },
  {
    id: '2',
    name: 'presentation.pdf',
    type: 'file',
    size: '2.4 MB',
    modified: '1 hour ago',
    fileType: 'document',
    shared: true,
    synced: true
  },
  {
    id: '3',
    name: 'network_diagram.png',
    type: 'file',
    size: '856 KB',
    modified: '30 min ago',
    fileType: 'image',
    synced: true
  },
  {
    id: '4',
    name: 'demo_video.mp4',
    type: 'file',
    size: '125 MB',
    modified: '1 day ago',
    fileType: 'video'
  }
];

export function FileManager({ isDark = true }: FileManagerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') return FolderOpen;
    
    switch (item.fileType) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'audio': return Music;
      case 'archive': return Archive;
      default: return File;
    }
  };

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              File Manager
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage and share files across your mesh network
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}>
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-500 text-white'
                    : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-500 text-white'
                    : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HardDrive className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Local Storage
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2.4 GB used of 32 GB available
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  12 devices connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="space-y-2">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file);
            
            return (
              <div
                key={file.id}
                className={`p-4 rounded-xl border transition-colors hover:shadow-md ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.type === 'folder' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {file.name}
                        </h3>
                        {file.shared && (
                          <Share2 className="w-4 h-4 text-blue-500" title="Shared" />
                        )}
                        {file.synced && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Synced" />
                        )}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        {file.size && (
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {file.size}
                          </span>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {file.modified}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Download className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className={`p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFiles.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No files found</p>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms' : 'Upload files to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}