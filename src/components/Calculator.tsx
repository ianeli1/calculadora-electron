import React from "react";
import { Display } from "./Display";
import { Keyboard } from "./Keyboard";

export const Calculator = () => {
  return (
    <div className="bg-base-100 rounded-3xl p-7 flex flex-col gap-8 m-auto">
      {/* display */}
      <Display />
      {/* buttons */}
      <Keyboard />
    </div>
  );
};
