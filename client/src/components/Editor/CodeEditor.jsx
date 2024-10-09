import React, { useState } from "react";
import useStore from "../../store/useStore";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import { parseAndTransformProgram } from "../../helper/parseProgramHelper";

const CodeEditor = () => {
  // Access the Zustand store
  const { code, loadLmcProgram, runProgram, step, stop, reset, setCode } =
    useStore();

  // Handle changes in the editor
  const handleEditorChange = (value) => {
    setCode(value.toUpperCase());
  };

  // Load the program into the LMC simulator
  const handleLoadProgram = () => {
    if (!code) {
      toast.error("No instruction to load!");
      return;
    }

    const instructions = parseAndTransformProgram(code);

    loadLmcProgram(instructions);
    toast.success("Instruction loaded successfully!");
  };

  const handleClearClick = () => {
    setCode("");
    toast.info("Instruction cleared successfully!");
  };

  const handleRun = () => {
    runProgram();
    toast.info("Running program...");
  };

  const handleStep = async () => {
    await step();
  };

  const handleStop = () => {
    stop();
  };

  const handleReset = () => {
    reset();
    setCode("");
  };

  const handleCodeFormat = () => {
    const formattedCode = code
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return ""; // Skip empty lines
  
        // Remove existing pipes to prevent duplication
        const lineWithoutPipes = trimmedLine.replace(/\|/g, "").trim();
  
        // Split the line into parts based on whitespace
        const parts = lineWithoutPipes.split(/\s+/);
        let label = "", mnemonic = "", address = "";
  
        // Assign parts based on the number of components
        if (parts.length === 3) {
          [label, mnemonic, address] = parts;
        } else if (parts.length === 2) {
          [mnemonic, address] = parts;
        } else if (parts.length === 1) {
          [mnemonic] = parts;
        } else {
          // If there are more than 3 parts, consider only the first three
          [label, mnemonic, address] = parts.slice(0, 3);
        }
  
        // Define column widths
        const labelWidth = 5;
        const mnemonicWidth = 3;
        const addressWidth = 3;
  
        // Pad each part to ensure alignment
        const labelPadded = label.padEnd(labelWidth, " ");
        const mnemonicPadded = mnemonic.padEnd(mnemonicWidth, " ");
        const addressPadded = address.padEnd(addressWidth, " ");
  
        // Combine into a single formatted line with leading and trailing pipes
        return `${labelPadded.toUpperCase()} | ${mnemonicPadded.toUpperCase()} | ${addressPadded.toUpperCase()}`;
      })
      .join("\n");
  
    setCode(formattedCode);
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

        {/* Reset Button */}
        <button
          className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded text-xs"
          data-testid="reset-button"
          aria-label="Reset Program"
          onClick={handleReset}
        >
          <i className="bx bx-refresh mr-1" aria-hidden="true"></i>{" "}
          {/* Updated icon to reflect reset */}
          Reset
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
          scrollBeyondLastColumn: 0,
        }}
      />

      <div
        className="flex items-center space-x-2 mt-4"
        data-testid="left-button-group"
      >
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

        {/* Clear Button */}
        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs"
          data-testid="clear-button"
          aria-label="Clear Program"
          onClick={handleClearClick}
        >
          <i className="bx bx-trash mr-1" aria-hidden="true"></i>
          Clear
        </button>

        {/* <button
          className="flex items-center bg-violet-500 hover:bg-violet-600 text-white font-semibold py-1 px-3 rounded text-xs"
          data-testid="format-button"
          aria-label="Format Code"
          onClick={handleCodeFormat}
        >
          <i className="bx bx-file mr-1"></i>
          Format
        </button> */}
      </div>
    </div>
  );
};

export default CodeEditor;
