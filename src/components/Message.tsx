import { ArrowLeftRegular, ArrowRightRegular } from "@fluentui/react-icons";
import React from "react";

interface MessageProps {
  sending: boolean;
  message: string;
}
//TODO add a timestamp
//TODO add a way for checking if message is sent or not

export const Message = ({ message, sending }: MessageProps) => {
  return (
    <div
      className={`${
        sending ? "bg-accent" : ""
      } flex justify-between px-2 items-center`}
    >
      {sending ? <ArrowRightRegular /> : <ArrowLeftRegular />}
      {message}
    </div>
  );
};
