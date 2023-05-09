import { MyIpcRenderer, Operation } from "./types";

export function operationToNumber(operation: Operation): number {
  switch (operation) {
    case "+":
      return 0;
    case "-":
      return 1;
    case "*":
      return 2;
    case "/":
      return 3;
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }
}

export function getIpcRenderer(): MyIpcRenderer {
  try {
    //@ts-expect-error
    const ipcRenderer = window.ipcRenderer as MyIpcRenderer;
    return ipcRenderer;
  } catch (e) {
    throw new Error(`ipcRenderer not found: ${e}`);
  }
}
