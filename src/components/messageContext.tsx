import React from "react";

const messageContext = React.createContext<MessageContextState>(null!);

export interface MessageElement {
  sending: boolean;
  message: string;
  error: boolean;
  timestamp: Date;
}

interface MessageContextState {
  messages: MessageElement[];
  addMessage: (message: MessageElement) => void;
}

export const MessageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [messages, setMessages] = React.useState<MessageElement[]>([]);

  const addMessage = (message: MessageElement) => {
    setMessages((prev) => [...prev, message]);
  };

  const value = {
    messages,
    addMessage,
  };

  return (
    <messageContext.Provider value={value}>{children}</messageContext.Provider>
  );
};

export const useMessages = () => React.useContext(messageContext);

