import React from "react";
import { useMessages } from "./messageContext";

export interface DisplayProps {
  operation?: "+" | "-" | "*" | "/";
  result?: number;
  operand1?: number;
  operand2?: number;
}

//todo add load indicator

export const Display = ({
  operation,
  result,
  operand1,
  operand2,
}: DisplayProps) => {
  const { result: ctxResult, error } = useMessages();

  const result_f = ctxResult;

  console.log(`result_f: ${result_f}`);

  return (
    <section className="flex flex-col items-end">
      <div className="text-xl">
        {/* operation */}
        <span className="text-gray-500">
          {/* 1 operand */}
          {operand1?.toFixed(0) ?? " "}
        </span>
        <span>
          {/* operator */}
          {operation ?? " "}
        </span>
        <span className="text-gray-500">
          {/* 2 operand */}
          {operand2?.toFixed(0) ?? " "}
        </span>
        {/* result */}
      </div>
      <div className={`text-white text-4xl mt-1 ${error ? "bg-red-700" : ""}`}>
        <h2>
          {typeof result_f === "number" ? `=${result_f ?? "[error]"}` : " "}
        </h2>
      </div>
    </section>
  );
};
