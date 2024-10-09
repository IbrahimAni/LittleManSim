import { create } from "zustand";
import LMC from "../utils/lmcSimulator";
import { toast } from "react-toastify";

const lmc = new LMC();

const useStore = create((set, get) => ({
  lmc: lmc, // Create a new instance of the LMC simulator
  program: [], // The program to be loaded into the LMC
  accumulator: lmc.getAccumulator(), // The accumulator register value
  programCounter: lmc.getProgramCounter(), // The program counter value
  totalProgramCounter: lmc.getTotalProgramCounter(), // The total program counter value
  mailboxes: lmc.getMemory(),
  halted: lmc.getHaltedSatate(), // Whether the LMC is in a halted state
  error: null, // Error message if an error occurs
  outputs: lmc.getOutputs(), // Initialize with an empty array
  code: "", // The code editor value
  currentInstructionId: null, // The currently selected instruction ID
  logs: lmc.getDocumentations(), // Array to store logs
  highlightedIndexes: [],
  programIndices: lmc.getProgramIndices(),
  showInputModal: false,
  modalMessage: "",
  onInputSubmit: null,
  inputRequired: false, // Indicates if input is required
  inputPromptMessage: "", // Message to display when input is required
  delayTime: 1000,

  //Actions

  setHighlightedIndexes: (indices) => set({ highlightedIndexes: indices }),

  /**
   * Loads a program into the LMC simulator.
   * @param {Array} instruction - The program instructions.
   */
  loadLmcProgram: (instructions) => {
    const lmcInstance = get().lmc;

    // convert the instructions to a lmc program(opcodes)
    const programs = lmcInstance.convertToProgram(instructions);

    lmcInstance.loadProgram(programs, instructions); // Load the new program (logs are generated here)

    set({
      program: programs,
      accumulator: lmcInstance.getAccumulator(),
      programCounter: lmcInstance.getProgramCounter(),
      totalProgramCounter: lmcInstance.getTotalProgramCounter(),
      mailboxes: lmcInstance.getMemory(),
      halted: lmcInstance.getHaltedSatate(),
      error: null,
      outputs: lmcInstance.getOutputs(),
      programIndices: lmcInstance.getProgramIndices(),
      logs: lmcInstance.getDocumentations(),
    });
  },

  /**
   * Sets the code in the editor directly.
   * @param {string} newCode - The new code to set.
   */
  setCode: (newCode) => set({ code: newCode }),

  /**
   * Sets the currently loaded instruction ID.
   * @param {string|null} id - The ID of the instruction.
   */
  setCurrentInstructionId: (id) => set({ currentInstructionId: id }),

  /**
   * Executes the next instruction (step) in the program.
   */
  step: async () => {
    const lmcInstance = get().lmc;
  
    // Set the input callback to handle user input via the Input component
    lmcInstance.setInputCallback((promptMessage, resolve) => {
      set({
        showInputModal: true,
        modalMessage: promptMessage,
        onInputSubmit: resolve,
      });
    });
  
    // Set the onStep callback to update the store's state after each step
    lmcInstance.setOnStepCallback(() => {
      set({
        accumulator: lmcInstance.getAccumulator(),
        programCounter: lmcInstance.getProgramCounter(),
        totalProgramCounter: lmcInstance.getTotalProgramCounter(),
        mailboxes: lmcInstance.getMemory(),
        halted: lmcInstance.getHaltedSatate(),
        outputs: lmcInstance.getOutputs(),
        logs: lmcInstance.getDocumentations(),
        programIndices: lmcInstance.getProgramIndices(),
      });
    });
  
    try {
      await lmcInstance.stepProgram();
  
      // Update store state after step
      set({
        accumulator: lmcInstance.getAccumulator(),
        programCounter: lmcInstance.getProgramCounter(),
        totalProgramCounter: lmcInstance.getTotalProgramCounter(),
        mailboxes: lmcInstance.getMemory(),
        halted: lmcInstance.getHaltedSatate(),
        error: null,
        outputs: lmcInstance.getOutputs(),
        logs: lmcInstance.getDocumentations(),
        showInputModal: false,
        modalMessage: "",
        onInputSubmit: null,
        programIndices: lmcInstance.getProgramIndices(),
      });
  
      // Only show success toast if the program has halted
      if (lmcInstance.getHaltedSatate()) {
        toast.success("Simulation completed successfully.");
      }
    } catch (error) {
      console.log(error);
      set({ error: error.message });
      toast.error(error.message);
    }
  },  

  /**
   * Runs the entire program until it halts.
   */
  runProgram: async () => {
    const lmcInstance = get().lmc;

    if (lmcInstance.isRunning) {
      set({ error: "Program is already running." });
      toast.error("Program is already running.");
      return;
    }

    // Set the input callback to handle user input via the Input component
    lmcInstance.setInputCallback((promptMessage, resolve) => {
      set({
        showInputModal: true,
        modalMessage: promptMessage,
        onInputSubmit: resolve,
      });
    });

    set((state) => ({
      logs: [...state.logs, "Input is required. Please provide a value."],
    }));

    // Set the onStep callback to update the store's state after each step
    lmcInstance.setOnStepCallback(() => {
      set({
        accumulator: lmcInstance.getAccumulator(),
        programCounter: lmcInstance.getProgramCounter(),
        totalProgramCounter: lmcInstance.getTotalProgramCounter(),
        mailboxes: lmcInstance.getMemory(),
        halted: lmcInstance.getHaltedSatate(),
        outputs: lmcInstance.getOutputs(),
        logs: lmcInstance.getDocumentations(),
        programIndices: lmcInstance.getProgramIndices(),
      });
    });

    set({ isRunning: true, error: null });

    try {
      await lmcInstance.run();
      // Update store state after successful run
      set({
        accumulator: lmcInstance.getAccumulator(),
        programCounter: lmcInstance.getProgramCounter(),
        totalProgramCounter: lmcInstance.getTotalProgramCounter(),
        mailboxes: lmcInstance.getMemory(),
        halted: lmcInstance.getHaltedSatate(),
        error: null,
        outputs: lmcInstance.getOutputs(),
        logs: lmcInstance.getDocumentations(),
        showInputModal: false,
        modalMessage: "",
        onInputSubmit: null,
        programIndices: lmcInstance.getProgramIndices(),
      });
      toast.success("Simulation completed successfully.");
    } catch (error) {
      console.log(error);
      set({ error: error.message, isRunning: false });
      toast.error(error.message);
    }
  },

  /**
   * Stops the program execution.
   */
  stopExecution: () => {
    const lmcInstance = get().lmc;
    try {
      lmcInstance.halted = true;
      set({
        halted: lmcInstance.halted,
        error: null,
      });
      toast.info("Program execution stopped.");
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    }
  },

  /**
   * Resets the LMC simulator to its initial state.
   */
  reset: () => {
    const lmcInstance = get().lmc;
    lmcInstance.reset();

    set({
      accumulator: lmcInstance.getAccumulator(),
      programCounter: lmcInstance.getProgramCounter(),
      mailboxes: lmcInstance.getMemory(),
      halted: lmcInstance.getHaltedSatate(),
      error: null,
      outputs: lmcInstance.getOutputs(),
      logs: lmcInstance.getDocumentations(),
      programIndices: lmcInstance.getProgramIndices(),
    });
    toast.info("Program reset successfully!");
  },

  /**
   * Adds an input value to the LMC's input queue.
   * @param {number} value - The input value.
   */
  addInput: (value) => {
    const lmcInstance = get().lmc;
    lmcInstance.setInbox(value);
    set({ error: null });
  },

  /**
   * Submits the user input from the Input component to the simulation.
   *
   * @param {string} input - The user-provided input.
   */
  submitInput: (input) => {
    const onInputSubmit = get().onInputSubmit;
    if (onInputSubmit) {
      onInputSubmit(input);
      set({
        showInputModal: false,
        modalMessage: "",
        onInputSubmit: null,
      });
    }
  },

  /**
   * Retrieves the next output value from the LMC.
   * @returns {number|null} The next output value or null if none.
   */
  getOutput: () => {
    const lmcInstance = get().lmc;
    return lmcInstance.getOutput();
  },

  /**
   * Clears all logs.
   */
  clearLogs: () => {
    const lmcInstance = get().lmc;
    lmcInstance.clearLogs();
    set({ logs: [] });
  },
}));

export default useStore;
