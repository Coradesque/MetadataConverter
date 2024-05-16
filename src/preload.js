// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron' ;
//import { platform } from 'os';

// can be accessed through 'preload.'
contextBridge.exposeInMainWorld('pre', {
	
	// Main and Renderer comunication model
	getUser: () => ipcRenderer.invoke('getUser'),
	openMetadata: () => ipcRenderer.invoke('openMetadata'),
	saveMetadata: (geoJSONArray) => ipcRenderer.invoke('saveMetadata', geoJSONArray),
	logOnRenderer: (callback) => ipcRenderer.on("logOnRenderer", (callback)),
	eventListener: (callback) => ipcRenderer.on("eventListener", (callback)),

	//platform: platform(), // create a property oj the app object for platform
});
