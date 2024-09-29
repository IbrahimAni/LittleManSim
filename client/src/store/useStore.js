import { create } from "zustand";
import LMC from "../utils/lmcSimulator";
import { toast } from "react-toastify";

const useStore = create((set, get) => ({
  lmc: new LMC(), // Create a new instance of the LMC simulator
  program: [], // The program to be loaded into the LMC
  accumulator: 0, // The accumulator register value
  programCounter: 0, // The program counter value
  mailboxes: Array(100).fill("000"), // The mailbox values
  halted: false, // Whether the LMC is in a halted state
  error: null, // Error message if an error occurs
  outputs: [], // Initialize with an empty array
  accumulatorEquation: "", // Equation to display in the accumulator
  code: "", // The code editor value
  currentInstructionId: null, // The currently selected instruction ID
  logs: [], // Array to store logs
  highlightedIndexes: [],

  //Actions

  setHighlightedIndexes: (indices) => set({ highlightedIndexes: indices }),

  /**
   * Sets the Accumulator Equation.
   * @param {string} equation - The equation to display.
   */
  setAccumulatorEquation: (equation) => set({ accumulatorEquation: equation }),

  /**
   * Loads a program into the LMC simulator.
   * @param {Array} program - The program instructions.
   */
  loadProgram: (program) => {
    const lmcInstance = get().lmc;
    lmcInstance.loadProgram(program);
    lmcInstance.clearLogs(); // Clear logs when loading a new program
    set({
      program,
      accumulator: lmcInstance.accumulator,
      programCounter: lmcInstance.programCounter,
      mailboxes: [...lmcInstance.memory],
      halted: lmcInstance.halted,
      error: null,
      outputs: [],
      accumulatorEquation: "",
      logs: lmcInstance.getLogs(),
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
  step: () => {
    const lmcInstance = get().lmc;
    try {
      lmcInstance.step();

      // Update states based on the LMC's current state
      set({
        accumulator: lmcInstance.accumulator,
        programCounter: lmcInstance.programCounter,
        mailboxes: [...lmcInstance.memory],
        halted: lmcInstance.halted,
        error: null,
        outputs: lmcInstance.outputs,
        logs: lmcInstance.getLogs(),
      });

      // Update the accumulator equation if LMC provides it
      const currentEquation = lmcInstance.getCurrentEquation();
      if (currentEquation) {
        set({ accumulatorEquation: currentEquation });
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    }
  },

  /**
   * Runs the entire program until it halts.
   */
  run: () => {
    const lmcInstance = get().lmc;
    try {
      while (!lmcInstance.halted) {
        lmcInstance.step();
      }

      // Update states based on the LMC's current state
      set({
        accumulator: lmcInstance.accumulator,
        programCounter: lmcInstance.programCounter,
        mailboxes: [...lmcInstance.memory],
        halted: lmcInstance.halted,
        error: null,
        outputs: lmcInstance.outputs,
        logs: lmcInstance.getLogs(),
      });

      // Update the accumulator equation if LMC provides it
      const currentEquation = lmcInstance.getCurrentEquation(); // Placeholder method
      if (currentEquation) {
        set({ accumulatorEquation: currentEquation });
      }

      toast.success("Program execution completed successfully.");
    } catch (error) {
      set({ error: error.message });
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
    lmcInstance.clearLogs(); // Clear logs when resetting the LMC
    set({
      accumulator: lmcInstance.accumulator,
      programCounter: lmcInstance.programCounter,
      mailboxes: Array(100).fill("000"),
      halted: lmcInstance.halted,
      error: null,
      outputs: [],
      accumulatorEquation: "", // Reset the equation on reset
      logs: lmcInstance.getLogs(),
    });    
    toast.info("Program reset successfully!");
  },

  /**
   * Adds an input value to the LMC's input queue.
   * @param {number} value - The input value.
   */
  addInput: (value) => {
    const lmcInstance = get().lmc;
    lmcInstance.addInput(value);
    set({ error: null });
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
