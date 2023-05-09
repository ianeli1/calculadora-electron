import { SpinnerIosRegular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import type { MyIpcRenderer, SerialReceiveArgs } from "../utils/types";
import { MessageElement } from "./messageContext";

const origTimestamp = new Date();

const exampleMessages: MessageElement[] = [
  { sending: true, message: "Hello", timestamp: origTimestamp, error: false },
  { sending: false, message: "Hi", timestamp: origTimestamp, error: false },
  {
    sending: true,
    message: "How are you?",
    timestamp: origTimestamp,
    error: false,
  },
  {
    sending: false,
    message: "I'm fine, thanks",
    timestamp: origTimestamp,
    error: false,
  },
];

export const Console = () => {
  //Creates a ipcRenderer channel listener for "serial_receive" and stores the data in MessageElement state array
  const [messages, setMessages] = useState<MessageElement[]>(exampleMessages);
  useEffect(() => {
    const callback = (obj: SerialReceiveArgs) => {
      const { result, error } = obj;
      setMessages((messages) => [
        ...messages,
        {
          sending: false,
          message: `Data received: ${result}`,
          timestamp: new Date(),
          error,
        },
      ]);
    };

    //@ts-expect-error
    const ipcRenderer = window.ipcRenderer as MyIpcRenderer;

    return ipcRenderer.on("serial_receive", callback);
  }, []);

  return (
    <section className="bg-base-300 rounded-3xl flex flex-col m-auto w-10/12 h-full overflow-hidden justify-end">
      <div className="overflow-y-auto">
        {/* message history */}
        {messages.map((message, index) => (
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
