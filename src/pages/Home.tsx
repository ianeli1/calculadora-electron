import React from "react";
import { Calculator } from "../components/Calculator";
import { Console } from "../components/Console";
import { Window } from "./Window";
import { MessageProvider } from "../components/messageContext";
import { PortSelector } from "../components/PortSelector";

function Home() {
  return (
    <MessageProvider>
      <Window>
        <div className="grid grid-cols-2 items-center justify-center gap-4 p-4 overflow-hidden">
          <Calculator />
          <div className="grid grid-rows-2 h-screen gap-2 py-2">
            <PortSelector />
            <Console />
          </div>
        </div>
      </Window>
    </MessageProvider>
  );
}

export default Home;
