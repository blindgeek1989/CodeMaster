const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { autoUpdater } = require('electron-updater');

// sql.js — lazy-initialise on first SQL exercise
let sqlPromise = null;
function getSqlJs() {
  if (!sqlPromise) {
    const initSqlJs = require('sql.js');
    sqlPromise = initSqlJs({
      locateFile: (file) => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file),
    });
  }
  return sqlPromise;
}

function formatSqlResults(results) {
  if (!results || results.length === 0) return '(no rows returned)';
  return results.map(({ columns, values }) => {
    if (!columns || columns.length === 0) return '(no columns)';
    const widths = columns.map((c, i) =>
      Math.max(c.length, ...values.map(row => String(row[i] ?? 'NULL').length))
    );
    const sep = widths.map(w => '-'.repeat(w)).join('-+-');
    const header = columns.map((c, i) => c.padEnd(widths[i])).join(' | ');
    const rows = values.map(row =>
      row.map((v, i) => String(v ?? 'NULL').padEnd(widths[i])).join(' | ')
    );
    return [header, sep, ...rows].join('\n');
  }).join('\n\n');
}

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

ipcMain.handle('run-code', async (_event, { code, language, schema }) => {
  if (language === 'python') {
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
  }

  if (language === 'sql') {
    try {
      const SQL = await getSqlJs();
      const db = new SQL.Database();
      try {
        if (schema) db.run(schema);
        const results = db.exec(code);
        return { success: true, output: formatSqlResults(results) };
      } catch (err) {
        return { success: false, output: err.message };
      } finally {
        db.close();
      }
    } catch (err) {
      return { success: false, output: `SQL engine error: ${err.message}` };
    }
  }

  if (language === 'powershell') {
    return new Promise((resolve) => {
      const proc = spawn('powershell', [
        '-NoProfile', '-NonInteractive', '-Command', code,
      ], { timeout: 10000 });
      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => { stdout += data.toString(); });
      proc.stderr.on('data', (data) => { stderr += data.toString(); });

      proc.on('close', (exitCode) => {
        const out = stdout.trimEnd();
        if (exitCode === 0 || out) {
          resolve({ success: true, output: out });
        } else {
          resolve({ success: false, output: stderr.trimEnd() || 'Command failed.' });
        }
      });

      proc.on('error', (err) => {
        resolve({ success: false, output: `PowerShell error: ${err.message}` });
      });
    });
  }

  return { success: true, output: '' };
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
