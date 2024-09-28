import React from "react";
import useStore from "../store/useStore";

const LogInfo = () => {
  const logs = useStore((state) => state.logs);

  return (
    <div
      className="log-information p-4 bg-gray-100 rounded-md shadow-md mt-4 font-mono"
      data-testid="log-information-container"
    >
      <h2 className="text-lg font-semibold mb-4">Log Information</h2>
      {logs.length === 0 ? (
        <div className="text-gray-500 italic" data-testid="no-log-placeholder">
          No log information is displayed.
        </div>
      ) : (
        <div className="overflow-x-auto font-mono">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Mnemonic</th>
                <th className="px-4 py-2 border">Opcode</th>
                <th className="px-4 py-2 border">Mailbox</th>
                <th className="px-4 py-2 border">Instruction</th>
                <th className="px-4 py-2 border">Accumulator</th>
                <th className="px-4 py-2 border">Program Counter</th>
                <th className="px-4 py-2 border">Comments</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border text-center font-mono">
                    {log.mnemonic}
                  </td>
                  <td className="px-4 py-2 border text-center font-mono">
                    {log.opcode}
                  </td>
                  <td className="px-4 py-2 border text-center font-mono">
                    {log.mailbox}
                  </td>
                  <td className="px-4 py-2 border font-mono">
                    {log.instruction}
                  </td>
                  <td className="px-4 py-2 border text-center font-mono">
                    {log.accumulator}
                  </td>
                  <td className="px-4 py-2 border text-center font-mono">
                    {log.programCounter}
                  </td>
                  <td className="px-4 py-2 border font-mono">{log.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogInfo;
