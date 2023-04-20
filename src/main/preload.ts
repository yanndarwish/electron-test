import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openLink: (url: string) => ipcRenderer.send('open-link', url),
});
