import React, { useState } from "react";
import useStore from "../../store/useStore";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const loadProgram = useStore((state) => state.loadProgram);
  const clearProgram = useStore((state) => state.clearProgram);
  const run = useStore((state) => state.run);
  const step = useStore((state) => state.step);
  const stop = useStore((state) => state.stopExecution);

  const handleEditorChange = (value) => {
    setCode(value.toUpperCase());
  };

  const parseProgram = (code) => {
    const lines = code.split("\n");
    const program = lines.map((line) => {
      const trimmed = line.trim();

      // Ignore empty lines and comments
      if (trimmed === "" || trimmed.startsWith("//")) return 0;

      // Split the line into parts
      const parts = trimmed.split(/\s+/); // Split by whitespace

      // Assume format: [label:] mnemonic address
      let mnemonic, address;

      if (parts.length === 3) {
        // Line with label
        mnemonic = parts[1];
        address = parts[2];
      } else if (parts.length === 2) {
        // Line without label
        mnemonic = parts[0];
        address = parts[1];
      } else if (parts.length === 1) {
        // Only mnemonic (e.g., HLT)
        mnemonic = parts[0];
        address = "";
      } else {
        // Invalid format
        return 0;
      }

      // Here you can map mnemonics to their corresponding numeric codes
      // For simplicity, we'll return 0 for non-numeric lines
      // Implement your actual parsing logic as needed
      return 0;
    });
    return program;
  };

  const handleLoadProgram = () => {
    const program = parseProgram(code);
    loadProgram(program);
  };

  const handleClearClick = () => {
    setCode("");
    clearProgram(); // Clear the program from the store
  };

  const handleRun = () => {
    run();
  };

  const handleStep = () => {
    step();
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div
      className="code-editor p-4 bg-gray-100 rounded-md shadow-md relative z-10"
      data-testid="code-editor-container"
    >
      {/* Button Group */}
      <div
        className="flex items-center space-x-2 mb-4"
        data-testid="button-group"
      >
        {/* Left Button Group: Run, Step, Stop */}
        <div
          className="flex items-center space-x-2"
          data-testid="left-button-group"
        >
          {/* Run Button */}
          <button
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-xs"
            data-testid="run-button"
            aria-label="Run Program"
            onClick={handleRun}
          >
            <i className="bx bx-play mr-1" aria-hidden="true"></i>
            Run
          </button>

          {/* Step Button */}
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded text-xs"
            data-testid="step-button"
            aria-label="Step Instruction"
            onClick={handleStep}
          >
            <i className="bx bx-step-forward mr-1" aria-hidden="true"></i>
            Step
          </button>

          {/* Stop Button */}
          <button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs"
            data-testid="stop-button"
            aria-label="Stop Program"
            onClick={handleStop}
          >
            <i className="bx bx-stop mr-1" aria-hidden="true"></i>
            Stop
          </button>
        </div>

        {/* Divider */}
        <div
          className="h-6 border-l border-gray-400 mx-4"
          data-testid="button-divider"
        ></div>

        {/* Load Button */}
        <button
          className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded text-xs"
          data-testid="load-button"
          aria-label="Load Program"
          onClick={handleLoadProgram}
        >
          <i className="bx bx-upload mr-1" aria-hidden="true"></i>
          Load
        </button>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="363px"
        defaultLanguage="lmc"
        defaultValue="// Write LMC program here"
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
        aria-label="LMC Code Editor"
        data-testid="code-editor"
        options={{
          minimap: { enabled: false },
          wordWrap: "off",
          validation: false,
          fontFamily: "Courier New, monospace",
          fontSize: 13,
          glyphMargin: false,
          lineNumbersMinChars: 3,
          tabSize: 2,
          insertSpaces: true,
          formatOnType: false,
          formatOnPaste: false,
          renderIndentGuides: false,
          rulers: [],
          overviewRulerLanes: 0,
          folding: false,
          
        }}
      />

      {/* Clear Button */}
      <button
        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs mt-4"
        data-testid="clear-button"
        aria-label="Clear Program"
        onClick={handleClearClick}
      >
        <i className="bx bx-trash mr-1" aria-hidden="true"></i>
        Clear
      </button>
    </div>
  );
};

export default CodeEditor;
