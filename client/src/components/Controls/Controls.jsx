import React from "react";
import useStore from "../../store/useStore";

const Controls = () => {
  const loadProgram = useStore((state) => state.loadProgram);
  const step = useStore((state) => state.step);
  const run = useStore((state) => state.run);
  const reset = useStore((state) => state.reset);
  const error = useStore((state) => state.error);

 // Example program: Load 10 into accumulator, add 20, halt
 const exampleProgram = [
    501, // LDA 1
    101, // ADD 1
    0,   // HLT
    0o10, // Mailbox 1: 10
    0o20, // Mailbox 2: 20
    // ... rest filled with 0
  ];

  const handleLoadProgram = () => {
    // Load a default or user-defined program
    loadProgram(exampleProgram);
  };

  return (
    <div className="controls">
      <button onClick={handleLoadProgram}>Load Program</button>
      <button onClick={step}>Step</button>
      <button onClick={run}>Run</button>
      <button onClick={reset}>Reset</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Controls;
