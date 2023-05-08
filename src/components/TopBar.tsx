import React from "react";
import {
  DismissRegular,
  MaximizeRegular,
  SubtractRegular,
} from "@fluentui/react-icons";

interface TopBarProps {}

export const TopBar = ({}: TopBarProps) => {
  return (
    <nav className="navbar bg-base-100 draggable-only">
      <h3 className="flex-1 text-xl">FPGAlculator</h3>
      <div className="flex-none undrag gap-1">
        <button className="btn btn-square">
          <SubtractRegular />
        </button>
        <button className="btn btn-square">
          <MaximizeRegular />
        </button>
        <button className="btn btn-square">
          <DismissRegular />
        </button>
      </div>
    </nav>
  );
};
