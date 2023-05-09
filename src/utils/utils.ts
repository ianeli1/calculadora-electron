import { Operation } from "./types";

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

