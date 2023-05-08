import {
  SubtractRegular,
  MaximizeRegular,
  DismissRegular,
} from "@fluentui/react-icons";
import React from "react";

interface WindowControlsProps {
  className?: string;
}

export const WindowControls = ({ className }: WindowControlsProps) => {
  return (
    <div className={`gap-1 ${className}`}>
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
  );
};
