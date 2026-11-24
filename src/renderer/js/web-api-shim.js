// Web compatibility shim — only activates in a browser context.
// In Electron, preload.js sets window.electronAPI before any page scripts run,
// so this block is never entered.
if (!window.electronAPI) {
  window.electronAPI = {
    getVersion: () => Promise.resolve('1.9.2'),

    openExternal: (url) => {
      window.open(url, '_blank', 'noopener,noreferrer');
    },

    runCode: (_code, _language) => Promise.resolve({
      success: false,
      output: 'Live code execution is only available in the CodeMaster desktop app.\nDownload it free at: github.com/blindgeek1989/CodeMaster/releases',
    }),

    // Updater — no-ops in browser
    checkForUpdates:    () => {},
    downloadUpdate:     () => {},
    installUpdate:      () => {},
    onUpdateAvailable:  () => {},
    onDownloadProgress: () => {},
    onUpdateDownloaded: () => {},
    onUpdateError:      () => {},
  };
}
