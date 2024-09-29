import React, { useState } from "react";
import useStore from "../../store/useStore";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";

const CodeEditor = () => {
  const code = useStore((state) => state.code);
  const setCode = useStore((state) => state.setCode);
  const loadProgram = useStore((state) => state.loadProgram);
  const run = useStore((state) => state.run);
  const step = useStore((state) => state.step);
  const stop = useStore((state) => state.stopExecution);
  const reset = useStore((state) => state.reset);
  const setHighlightedIndexes = useStore(
    (state) => state.setHighlightedIndexes
  );

  // Define mnemonic to opcode mapping
  const mnemonicMap = {
    ADD: 100,
    SUB: 200,
    STA: 300,
    LDA: 500,
    BRA: 600,
    BRZ: 700,
    BRP: 800,
    INP: 901,
    OUT: 902,
    HLT: 0,
  };

  // Handle changes in the editor
  const handleEditorChange = (value) => {
    setCode(value.toUpperCase());
  };

  const parseProgram = (code) => {
    const lines = code.split("\n");
    const program = [];
    const labelMap = {};

    // First pass: Handle labels and build label map
    lines.forEach((line, index) => {
      const trimmed = line.replace(/\|/g, "").trim(); // Remove pipes and trim
      if (trimmed === "" || trimmed.startsWith("//")) return; // Skip empty lines and comments

      const parts = trimmed.split(/\s+/); // Split by whitespace
      let label = "";
      let mnemonic = "";
      let address = "";

      if (parts.length === 3) {
        // Line with label
        label = parts[0];
        mnemonic = parts[1].toUpperCase();
        address = parts[2];
        labelMap[label] = program.length;
      } else if (parts.length === 2) {
        const possibleMnemonic = parts[0].toUpperCase();
        if (mnemonicMap.hasOwnProperty(possibleMnemonic)) {
          // Line with mnemonic and address (no label)
          mnemonic = possibleMnemonic;
          address = parts[1];
        } else {
          // Line with label and mnemonic (no address)
          label = parts[0];
          mnemonic = parts[1].toUpperCase();
          labelMap[label] = program.length;
        }
      } else if (parts.length === 1) {
        // Only mnemonic (e.g., HLT)
        mnemonic = parts[0];
      } else {
        toast.error(`Invalid instruction format on line ${index + 1}`);
      }

      program.push({ label, mnemonic, address, originalLine: index + 1 });
    });

    // Initialize all mailboxes to '000'
    const numericProgram = Array(100).fill("000");
    const opcodeIndices = [];

    // Second pass: Convert mnemonics and resolve labels
    program.forEach((instr, idx) => {
      const { mnemonic, address, originalLine } = instr;

      if (mnemonic === "DAT") {
        if (!address) {
          // DAT without address, keep '000', no change needed
          return;
        }

        if (/^\d+$/.test(address)) {
          // DAT with numeric address
          numericProgram[idx] = String(address).padStart(3, "0");
          opcodeIndices.push(idx);
        } else {
          toast.error(`Invalid DAT value "${address}" on line ${originalLine}`);
          numericProgram[idx] = "000"; // Default to '000' on error
        }
        // No highlighting for DAT
        return;
      }

      const opcode = mnemonicMap[mnemonic];

      if (opcode === undefined) {
        toast.error(`Unknown mnemonic "${mnemonic}" on line ${originalLine}`);
        numericProgram[idx] = "000"; // Default to '000' on error
        return;
      }

      let operand = 0;
      if (address) {
        if (/^\d+$/.test(address)) {
          operand = parseInt(address, 10);
        } else {
          // Operand is a label
          const labelAddress = labelMap[address];
          if (labelAddress === undefined) {
            toast.error(`Undefined label "${address}" on line ${originalLine}`);
            operand = 0;
          } else {
            operand = labelAddress;
          }
        }
      }

      const numericValue = opcode + operand;
      numericProgram[idx] = String(numericValue).padStart(3, "0");

      // Only add to opcodeIndices if the numeric value is not '000'
      if (mnemonic === "HLT" || numericProgram[idx] !== "000") {
        opcodeIndices.push(idx);
      }
    });

    return { numericProgram, opcodeIndices };
  };

  /**
   * Handles loading the program into RAM.
   */
  const handleLoadProgram = () => {
    if(!code) {
      toast.error("No instruction to load!");
      return
    }
    const { numericProgram, opcodeIndices } = parseProgram(code);
    loadProgram(numericProgram);
    setHighlightedIndexes(opcodeIndices);
    toast.success("Instruction loaded successfully!");
  };

  const handleClearClick = () => {
    setCode("");
    toast.info("Instruction cleared successfully!");
  };

  const handleRun = () => {
    run();
    toast.info("Running program...");
  };

  const handleStep = () => {
    step();
  };

  const handleStop = () => {
    stop();
  };

  const handleReset = () => {
    reset();
    setCode("");
    setHighlightedIndexes([]);
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
      </div>
    </div>
  );
};

export default CodeEditor;
