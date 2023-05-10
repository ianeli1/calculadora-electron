import React, { useState } from "react";

const messageContext = React.createContext<MessageContextState>(null!);

export interface MessageElement {
  sending: boolean;
  message: string;
  error: boolean;
  timestamp: Date;
}

interface MessageContextState {
  messages: MessageElement[];
  result: number;
  error: boolean;
  setResult: (result: number) => void;
  setError: (error: boolean) => void;
  addMessage: (message: MessageElement) => void;
}

export const MessageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [messages, setMessages] = React.useState<MessageElement[]>([]);

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const addMessage = (message: MessageElement) => {
    setMessages((prev) => [...prev, message]);
  };

  const value = {
    messages,
    addMessage,
    result,
    setResult: (res: number) => {
      console.log(`Updating result ctx to: ${res}`);
      setResult(res);
      if (!res) {
        setError(false);
      }
    },
    error,
    setError: (error: boolean) => {
      setError(error);
    },
  };

  return (
    <messageContext.Provider value={value}>{children}</messageContext.Provider>
  );
};

export const useMessages = () => React.useContext(messageContext);
