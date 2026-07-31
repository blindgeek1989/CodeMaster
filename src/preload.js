const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Code execution
  runCode: (code) => ipcRenderer.invoke('run-code', code),

  // App version
  getVersion: () => ipcRenderer.invoke('get-version'),

  // Auto-updater — user-initiated
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  installUpdate: () => ipcRenderer.invoke('install-update'),

  // Updater event listeners
  onUpdateAvailable: (cb) =>
    ipcRenderer.on('update-available', (_e, info) => cb(info)),
  onDownloadProgress: (cb) =>
    ipcRenderer.on('download-progress', (_e, progress) => cb(progress)),
  onUpdateDownloaded: (cb) =>
    ipcRenderer.on('update-downloaded', (_e, info) => cb(info)),
  onUpdateError: (cb) =>
    ipcRenderer.on('update-error', (_e, msg) => cb(msg)),
});
