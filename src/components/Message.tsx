import {
  ArrowLeftRegular,
  ArrowRightRegular,
  ErrorCircleRegular,
} from "@fluentui/react-icons";
import React from "react";

interface MessageProps {
  sending: boolean;
  message: string;
  error?: boolean;
}
//TODO add a timestamp
//TODO add a way for checking if message is sent or not

export const Message = ({ message, sending, error }: MessageProps) => {
  return (
    <div
      className={`${
        sending ? "bg-accent" : ""
      } flex justify-between px-2 items-center`}
    >
      {error ? <ErrorCircleRegular /> : undefined}
      {sending ? <ArrowRightRegular /> : <ArrowLeftRegular />}
      {message}
    </div>
  );
};
