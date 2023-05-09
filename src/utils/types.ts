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

