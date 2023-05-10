import React, { useEffect } from "react";
import { Display, DisplayProps } from "./Display";
import { Keyboard } from "./Keyboard";
import { Keys } from "./Keyboard";
import { SerialSendArgs } from "../utils/types";
import { useMessages } from "./messageContext";
import { MyIpcRenderer } from "../utils/types";

enum CalculatorStep {
  Op1,
  Op2,
}

const sendMessage = (obj: SerialSendArgs) => {
  //@ts-expect-error
  const ipcRenderer = window.ipcRenderer as MyIpcRenderer;
  ipcRenderer.send("serial_send", obj);
};

export const Calculator = () => {
  const [displayContents, setDisplayContents] = React.useState<DisplayProps>(
    {}
  );

  const { addMessage, setResult } = useMessages();

  const [step, setStep] = React.useState<CalculatorStep>(CalculatorStep.Op1);

  useEffect(() => {
    if (displayContents.operand1 > 255) {
      setDisplayContents((obj) => ({
        ...obj,
        operand1: 0,
      }));
    } else if (displayContents.operand2 > 255) {
      setDisplayContents((obj) => ({
        ...obj,
        operand2: 0,
      }));
    } else if (
      (displayContents.operand2 > displayContents.operand1 &&
        displayContents.operation === "-") ||
      (displayContents.operand2 === 0 && displayContents.operation == "/")
    ) {
      setDisplayContents({});
    } else if (Object.keys(displayContents).length === 0) {
      setStep(CalculatorStep.Op1);
    }
  }, [displayContents]);

  const onInput = React.useCallback(
    (input: Keys) => {
      switch (step) {
        case CalculatorStep.Op1:
          if (typeof input === "number") {
            setDisplayContents((obj) => ({
              ...obj,
              operand1: +((obj.operand1 ?? 0).toString() + input),
            }));
          } else if (typeof input === "string" && input != "=") {
            setDisplayContents((obj) => ({
              ...obj,
              operation: input,
            }));
            setStep(CalculatorStep.Op2);
          }
          break;
        case CalculatorStep.Op2:
          if (typeof input === "number") {
            setDisplayContents((obj) => ({
              ...obj,
              operand2: +((obj.operand2 ?? 0).toString() + input),
            }));
          } else if (input === "=") {
            //mandar serial y esperar respuesta
            if (
              "operand1" in displayContents &&
              "operand2" in displayContents &&
              "operation" in displayContents
            ) {
              sendMessage({
                op1: displayContents.operand1,
                op2: displayContents.operand2,
                operation: displayContents.operation,
              });
              addMessage({
                sending: true,
                message: `${displayContents.operand1} ${displayContents.operation} ${displayContents.operand2}`,
                error: false,
                timestamp: new Date(),
              });
            } else {
              console.log(
                `Missing parameters in ${JSON.stringify(displayContents)}`
              );
            }
          } else if (typeof input === "string") {
            setDisplayContents((obj) => ({
              ...obj,
              operation: input,
            }));
          }
          break;
      }
    },
    [step, displayContents]
  );

  const onDelete = React.useCallback(
    (fullDelete: boolean) => {
      if (fullDelete) {
        setDisplayContents({});
        setStep(CalculatorStep.Op1);
        setResult(null);
        return;
      }
      switch (step) {
        case CalculatorStep.Op2:
          setDisplayContents((obj) => ({
            operand1: obj.operand1,
            operation: obj.operation,
          }));
          break;
        default:
          setDisplayContents({});
          setStep(CalculatorStep.Op1);
      }
    },
    [step]
  );

  return (
    <div className="bg-base-100 rounded-3xl p-7 flex flex-col gap-8 m-auto">
      {/* display */}
      <Display {...displayContents} />
      {/* buttons */}
      <Keyboard onDelete={onDelete} onInput={onInput} />
    </div>
  );
};
