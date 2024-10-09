import React from "react";
import useStore from "../../store/useStore";

const Accumulator = () => {
  const { accumulator } = useStore();

  return (
    <div
      className="bg-gray-100 p-4 rounded shadow-md font-mono flex flex-col items-center"
      data-testid="accumulator-section"
      aria-labelledby="accumulator-title"
      role="region"
    >
      <h2
        id="accumulator-title"
        className="text-sm font-semibold mb-2 text-center"
        data-testid="accumulator-title"
      >
        Accumulator
      </h2>
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center">
        <div
          className="bg-white border border-[#F97316] text-[#F97316] text-sm sm:text-md font-bold p-3 rounded flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 shadow-sm mb-2"
          data-testid="accumulator-value"
          aria-label={`Accumulator value ${accumulator}`}
        >
          {accumulator}
        </div>
      </div>
    </div>
  );
};

export default Accumulator;
