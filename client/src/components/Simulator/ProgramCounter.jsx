import React from 'react';
import useStore from '../../store/useStore';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgramCounter = () => {
  // Access the Program Counter value from Zustand store
  const {totalProgramCounter, programCounter} = useStore();

  // Calculate percentage
  const percentage = (programCounter / totalProgramCounter) * 100;

  return (
    <div
      className="bg-gray-100 p-2 rounded shadow-md font-mono flex flex-col justify-center items-center"
      data-testid="program-counter-section"
      aria-labelledby="program-counter-title"
      role="region"
    >
      <h2
        id="program-counter-title"
        className="text-sm font-semibold text-center"
        data-testid="program-counter-title"
      >
        Program Counter
      </h2>
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: '#F97316', // Orange color for the path
            trailColor: '#d6d6d6', // Light gray for the trail
            strokeLinecap: 'round', // Rounded line endings
          })}
          data-testid="circular-progressbar"
          aria-label={`Program Counter at ${programCounter}`}
        >
          <div className="text-xs sm:text-sm font-bold text-gray-800">
            {programCounter}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default ProgramCounter;
