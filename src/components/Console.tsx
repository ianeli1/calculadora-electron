import { SpinnerIosRegular } from "@fluentui/react-icons";
import React from "react";
import { Message } from "./Message";

const exampleMessages = [
  { sending: true, message: "Hello" },
  { sending: false, message: "Hi" },
  { sending: true, message: "How are you?" },
  { sending: false, message: "I'm fine, thanks" },
];

export const Console = () => {
  return (
    <section className="bg-base-300 rounded-3xl flex flex-col m-auto w-10/12 h-full overflow-hidden justify-end">
      <div className="overflow-y-auto">
        {/* message history */}
        {exampleMessages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
      <div className="bg-accent-focus text-white flex justify-between px-4 py-2">
        Listening...
        <div className="animate-spin flex justify-center items-center">
          <SpinnerIosRegular />
        </div>
      </div>
    </section>
  );
};
