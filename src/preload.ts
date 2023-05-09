// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { MyIpcRenderer } from "./utils/types";

// preload.js
const { contextBridge, ipcRenderer } = require("electron");

const myIpcRenderer: MyIpcRenderer = {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, callback: (...arg0: any) => void) => {
    const newCallback = (_: any, ...args: any) => callback(...args);
    ipcRenderer.on(channel, newCallback);

    return () => ipcRenderer.removeListener(channel, newCallback);
  },
  invoke: (channel: string, data?: any) => ipcRenderer.invoke(channel, data),
  // Add other IPC methods you need to use in the renderer process
};

contextBridge.exposeInMainWorld("ipcRenderer", myIpcRenderer);
