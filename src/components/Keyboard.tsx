import { BackspaceRegular } from "@fluentui/react-icons";
import React, { useCallback, useMemo } from "react";

const baseClasses = "btn text-2xl";
const numberButtonClasses = `${baseClasses} btn-square bg-base-300`;
const actionButtonClasses = `${baseClasses} btn-accent`;

export type Keys =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | "+"
  | "-"
  | "*"
  | "/"
  | "=";

interface KeyboardProps {
  onInput: (input: Keys) => void;
  onDelete: (fullDelete: boolean) => void;
}

export const Keyboard = ({ onDelete, onInput }: KeyboardProps) => {
  const onAcCallback = useCallback(() => onDelete(true), [onDelete]);
  const onBackspaceCallback = useCallback(() => onDelete(false), [onDelete]);
  const onNumberCallbackList = useMemo(
    () =>
      ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map(
        (number) => () => onInput(number)
      ),
    [onInput]
  );
  const onActionCallbackMap = useMemo(
    () =>
      new Map<Keys, () => void>(
        (["+", "-", "*", "/", "="] as const).map((action) => [
          action,
          () => onInput(action),
        ])
      ),
    [onInput]
  );
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {/* ac, backspace, divide, multiply */}
      <button
        onClick={onAcCallback}
        className={`${actionButtonClasses} btn-square`}
      >
        AC
      </button>
      <button
        onClick={onBackspaceCallback}
        className={`${actionButtonClasses} btn-square`}
      >
        <BackspaceRegular />
      </button>
      <button
        onClick={onActionCallbackMap.get("/")}
        className={`${actionButtonClasses} btn-square`}
      >
        /
      </button>
      <button
        onClick={onActionCallbackMap.get("*")}
        className={`${actionButtonClasses} btn-square`}
      >
        *
      </button>
      {/* 7,8,9,minus */}
      <button onClick={onNumberCallbackList[7]} className={numberButtonClasses}>
        7
      </button>
      <button onClick={onNumberCallbackList[8]} className={numberButtonClasses}>
        8
      </button>
      <button onClick={onNumberCallbackList[9]} className={numberButtonClasses}>
        9
      </button>
      <button
        onClick={onActionCallbackMap.get("-")}
        className={`${actionButtonClasses} btn-square`}
      >
        -
      </button>
      {/*buttons for 4,5,6*/}
      <button onClick={onNumberCallbackList[4]} className={numberButtonClasses}>
        4
      </button>
      <button onClick={onNumberCallbackList[5]} className={numberButtonClasses}>
        5
      </button>
      <button onClick={onNumberCallbackList[6]} className={numberButtonClasses}>
        6
      </button>

      <button
        onClick={onActionCallbackMap.get("+")}
        className={`${actionButtonClasses} btn-square h-full row-span-2`}
      >
        +
      </button>

      {/* 1,2,3 */}
      <button onClick={onNumberCallbackList[1]} className={numberButtonClasses}>
        1
      </button>
      <button onClick={onNumberCallbackList[2]} className={numberButtonClasses}>
        2
      </button>
      <button onClick={onNumberCallbackList[3]} className={numberButtonClasses}>
        3
      </button>

      {/* 0, equals. both being twice as long */}
      <button
        onClick={onNumberCallbackList[0]}
        className={`${baseClasses} bg-base-300 col-span-2`}
      >
        0
      </button>
      <button
        onClick={onActionCallbackMap.get("=")}
        className={`${baseClasses} btn-warning col-span-2`}
      >
        =
      </button>
    </div>
  );
};
