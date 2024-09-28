// src/components/Simulator/Output.js
import React from "react";
// import ReactTooltip from "react-tooltip";
import useStore from "../store/useStore";

const Output = () => {
  // Access the outputs from the Zustand store
  const outputs = useStore((state) => state.outputs);

  return (
    <div
      className="bg-gray-100 p-2 rounded shadow-md font-mono justify-center items-center"
      data-testid="output-section"
      aria-labelledby="output-section-title"
      role="region"
    >
      <h2
        id="output-section-title"
        className="text-base font-semibold mb-1"
        data-testid="output-section-title"
      >
        Output
      </h2>
      {outputs.length > 0 ? (
        <div
        className="flex flex-wrap justify-center gap-1"
        data-testid="output-values-container"
      >
        {outputs.map((output, index) => {
          const isPositive = parseInt(output, 10) >= 0;
          return (
          <div
            key={index}
            className="border border-orange-500 text-orange-500 text-xs font-mono p-1 rounded flex items-center justify-center w-10 h-10 shadow-sm"
            data-testid={`output-value-${index}`}
            aria-label={`Output value ${index + 1}`}
            data-tip={`Output ${index + 1}: ${output}`}
          >
            {output}
            {/* <ReactTooltip /> */}
          </div>
        )})}
      </div>
      ) : (
        <div
          className="text-gray-400 text-center mt-2 text-xs"
          data-testid="no-output-placeholder"
          aria-live="polite"
        >
          No outputs yet.
        </div>
      )}
    </div>
  );
};

export default Output;
