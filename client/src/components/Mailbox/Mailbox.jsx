import React from "react";
import useStore from "../../store/useStore";

const Mailbox = () => {
  // Access program from Zustand store
  const { programIndices, mailboxes } = useStore();

  return (
    <div
      className="bg-gray-100 p-4 rounded shadow-md w-full"
      data-qa="ram-section"
    >
      <h2
        className="text-lg font-semibold mb-2 font-mono text-sm"
        data-qa="ram-section-title"
      >
        RAM / Mailboxes
      </h2>
      <div
        className="border p-2 rounded grid grid-cols-10 gap-1 text-xs"
        data-qa="ram-grid"
      >
        {mailboxes.map((value, index) => {
          const isHighlighted = programIndices.includes(index);
          return (
            <div
              key={index}
              className={`flex flex-col items-center ${
                isHighlighted ? "border-orange-600" : "border-gray-300"
              }`}
              data-qa={`ram-cell-${index}`}
            >
              <div
                className={`border rounded p-1 text-center w-full ${
                  isHighlighted
                    ? "bg-orange-500 text-white"
                    : "border-gray-300 text-gray-300"
                }`}
                data-qa={`ram-value-${index}`}
              >
                {value}
              </div>
              <div
                className="text-xs text-orange-300 mt-1"
                data-qa={`ram-label-${index}`}
              >
                {index.toString().padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mailbox;
