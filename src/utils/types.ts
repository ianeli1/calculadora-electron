import type { ByteArray } from "./byte";

export type Operation = "+" | "-" | "*" | "/";

export interface SerialSendArgs {
  op1: number;
  op2: number;
  operation: Operation;
}

export interface SerialPortSelectArgs {
  port: string;
}

export interface SerialReceiveArgs {
  result: number;
  error: boolean;
}

export interface MyIpcRenderer {
  on: (channel: string, callback: (...arg0: any) => void) => () => void;
  send: (channel: string, data: any) => void;
  invoke: (channel: string, data?: any) => Promise<any>;
}
