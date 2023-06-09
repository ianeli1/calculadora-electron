import React, { useCallback, useEffect, useState } from "react";
import { getIpcRenderer } from "../utils/utils";
import { SerialPortSelectArgs } from "../utils/types";
//import { SerialPort } from "serialport";

async function getPorts() {
  //return ["none"];
  try {
    return (await getIpcRenderer().invoke("serial_port_list")) as string[];
  } catch (e) {
    throw new Error(`An error ocurred trying to fetch ports available: ${e}`);
  }
}

export const PortSelector = () => {
  const [selectedPort, setSelectedPort] = useState<string | null>(null);
  const [ports, setPorts] = useState<string[]>([]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const port = e.target.id;
      setSelectedPort(port);
      const args: SerialPortSelectArgs = {
        port,
      };
      getIpcRenderer().send("serial_port_select", args);
    }
  }, []);

  useEffect(() => {
    getPorts().then((ports) => setPorts(ports));
  }, []);

  const reloadPorts = useCallback(() => {
    getPorts().then((ports) => setPorts(ports));
  }, []);

  return (
    <div className="card w-96 bg-base-300 text-primary-content h-full p-2">
      <div className="card-body flex flex-col overflow-hidden">
        <button className="btn btn-square text-white" onClick={reloadPorts}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M2.05 11H7v-1.5L2.05 12.5 7 14.5V13h5v-2H7V9.5l-4.95 1.5zM21.95 11H17v1.5l4.95-1.5-4.95-1.5V10h-5v2h5v1.5l4.95-1.5z" />
          </svg>
        </button>
        <div className="overflow-y-auto">
          {ports.map((port) => (
            <div className="form-control" key={port}>
              <label className="label cursor-pointer">
                <span className="label-text">{port ?? "[NONE]"}</span>
                <input
                  id={port}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked={selectedPort === port}
                  onChange={onChange}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
