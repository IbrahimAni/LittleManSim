import React from "react";
import useStore from "../store/useStore";

const LogInfo = () => {
  const logs = useStore((state) => state.logs);

  return (
    <div
      className="p-4 bg-gray-100 rounded shadow-md mt-4 font-mono"
      data-testid="log-information-container"
    >
      <h2 className="text-lg font-semibold mb-2">Log Information</h2>
      <div
        className="border border-orange-200 p-2 rounded font-mono overflow-x-auto max-h-full"
        data-qa="log-details"
      >
        {logs.length === 0 ? (
          <div
            className="text-gray-500 italic"
            data-testid="no-log-placeholder"
          >
            No log information is displayed.
          </div>
        ) : (
          <div className="table-container overflow-y-auto max-h-80">
            <table
              className="min-w-full divide-y divide-gray-200"
              data-qa="log-table"
            >
              <thead
                className="bg-gray-50 sticky top-0"
                data-qa="log-table-header"
              >
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-mnemonic"
                  >
                    Mnemonic
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-opcode"
                  >
                    Opcode
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-mailbox"
                  >
                    Mailbox
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-instruction"
                  >
                    Instruction
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-accumulator"
                  >
                    Accumulator
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-programCounter"
                  >
                    Program Counter
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                    data-qa="log-header-comments"
                  >
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                data-qa="log-table-body"
              >
                {logs.map((log, index) => (
                  <tr key={index} data-qa={`log-entry-${index}`}>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-mnemonic-${index}`}
                    >
                      {log.mnemonic}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-opcode-${index}`}
                    >
                      {log.opcode}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-mailbox-${index}`}
                    >
                      {log.mailbox}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-instruction-${index}`}
                    >
                      {log.instruction}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-accumulator-${index}`}
                    >
                      {log.accumulator}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-programCounter-${index}`}
                    >
                      {log.programCounter}
                    </td>
                    <td
                      className="px-4 py-2 text-xs"
                      data-qa={`log-comments-${index}`}
                    >
                      {log.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInfo;
