import React from "react";
import { Calculator } from "../components/Calculator";
import { Console } from "../components/Console";
import { Window } from "./Window";

function Home() {
  return (
    <Window>
      <div className="grid grid-cols-2 items-center justify-center gap-4 p-4 overflow-hidden">
        <Calculator />
        <div className="grid grid-rows-2 h-full">
          <div></div>
          <Console />
        </div>
      </div>
    </Window>
  );
}

export default Home;
