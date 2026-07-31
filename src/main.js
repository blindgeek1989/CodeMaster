const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'CodeMaster — Accessible Coding Learning Platform',
    backgroundColor: '#0f172a',
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
  createWindow();

  // Check for updates only in packaged app (not during npm start)
  if (app.isPackaged) {
    autoUpdater.checkForUpdates().catch(() => {});
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ===== Auto-updater events =====

autoUpdater.on('update-available', (info) => {
  if (!mainWindow) return;
  mainWindow.webContents.send('update-available', {
    version: info.version,
    releaseNotes: info.releaseNotes || '',
    releaseDate: info.releaseDate || '',
  });
});

autoUpdater.on('update-not-available', () => {
  // Silently do nothing — no update available
});

autoUpdater.on('download-progress', (progress) => {
  if (!mainWindow) return;
  mainWindow.webContents.send('download-progress', {
    percent: Math.round(progress.percent),
    transferred: progress.transferred,
    total: progress.total,
  });
});

autoUpdater.on('update-downloaded', (info) => {
  if (!mainWindow) return;
  mainWindow.webContents.send('update-downloaded', {
    version: info.version,
  });
});

autoUpdater.on('error', (err) => {
  if (!mainWindow) return;
  mainWindow.webContents.send('update-error', err.message);
});

// ===== IPC handlers =====

ipcMain.handle('run-code', async (_event, { code, language }) => {
  if (language !== 'python') {
    return { success: true, output: '' };
  }

  return new Promise((resolve) => {
    const proc = spawn('python', ['-c', code], { timeout: 10000 });
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    proc.on('close', (exitCode) => {
      if (exitCode === 0) {
        resolve({ success: true, output: stdout.trimEnd() });
      } else {
        // Strip internal file paths from tracebacks for cleaner display
        const cleaned = stderr.replace(/File "<string>", /g, '').trimEnd();
        resolve({ success: false, output: cleaned });
      }
    });

    proc.on('error', (err) => {
      if (err.code === 'ENOENT') {
        resolve({
          success: false,
          output: 'Python not found. Please install Python from python.org and add it to your PATH, then restart CodeMaster.',
        });
      } else {
        resolve({ success: false, output: err.message });
      }
    });
  });
});

ipcMain.handle('download-update', () => {
  autoUpdater.downloadUpdate();
});

ipcMain.handle('install-update', () => {
  autoUpdater.quitAndInstall(false, true);
});

ipcMain.handle('get-version', () => {
  return app.getVersion();
});
