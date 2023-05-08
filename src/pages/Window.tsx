import React from "react";
import { TopBar } from "../components/TopBar";

interface WindowProps {
  children: React.ReactNode;
}

export const Window = ({ children }: WindowProps) => {
  return (
    <main className="left-0 w-screen h-screen bg-base-200 justify-center content-center ">
      <div className="absolute top-1/2 -translate-y-1/2 w-full">{children}</div>
    </main>
  );
};
