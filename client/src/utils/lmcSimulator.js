/**
 * Little Man Computer (LMC) Simulator
 *
 * @class LMC
 */
class LMC {
  /**
   * Creates an instance of LMC.
   *
   * @param {number} [memorySize=100] - The size of the memory.
   */
  constructor(memorySize = 100) {
    this.memory = new Array(memorySize).fill(0);
    this.accumulator = 0;
    this.programCounter = 0;
    this.halted = false;
    this.inputs = [];
    this.outputs = [];
    this.currentEquation = "";
    this.logs = [];
  }

  /**
   * Loads a program into the LMC memory.
   *
   * @param {number[]} program - An array of instructions to load into memory.
   */
  loadProgram(program) {
    program.forEach((instruction, address) => {
      if (address < this.memory.length) {
        this.memory[address] = instruction;
      }
    });
    this.currentEquation = "Program Loaded.";
  }

  /**
   * Executes a single instruction from memory.
   *
   * @throws {Error} If the program has halted or an invalid opcode is encountered.
   */
  step() {
    if (this.halted) {
      this.currentEquation = "Program has halted.";
      return; // Instead of throwing an error, simply return.
    }

    if (this.programCounter < 0 || this.programCounter >= this.memory.length) {
      this.halted = true;
      this.currentEquation = "HALT: Program counter out of bounds.";
      throw new Error("Instruction counter out of bounds.");
    }

    const instruction = this.memory[this.programCounter];
    const opcode = Math.floor(instruction / 100);
    const operand = instruction % 100;

    const previousValue = this.accumulator; // Store previous accumulator value for equation display.

    let mnemonic = "";
    let comment = "";

    switch (opcode) {
      case 1: // ADD
        mnemonic = "ADD";
        const addValue = this.memory[operand];
        this.accumulator += addValue;
        this.currentEquation = `${previousValue} + ${addValue} = ${this.accumulator}`;
        comment = `Add ${addValue} to the value in the accumulator`;
        break;

      case 2: // SUB
        mnemonic = "SUB";
        const subValue = this.memory[operand];
        this.accumulator -= subValue;
        this.currentEquation = `${previousValue} - ${subValue} = ${this.accumulator}`;
        comment = `Subtract ${subValue} from the value in the accumulator`;
        break;

      case 3: // STA
        mnemonic = "STA";
        this.memory[operand] = this.accumulator;
        this.currentEquation = `STA ${operand} = ${this.accumulator}`;
        comment = `Store the value in the accumulator (${this.accumulator}) at address ${operand}`;
        break;

      case 5: // LDA
        mnemonic = "LDA";
        const loadValue = this.memory[operand];
        this.accumulator = loadValue;
        this.currentEquation = `LDA ${operand} (Value: ${loadValue})`;
        comment = `Load the value (${loadValue}) at address ${operand} into the accumulator`;
        break;

      case 6: // BRA
        mnemonic = "BRA";
        comment = `Branch always to address ${operand}`;
        this.currentEquation = `BRA ${operand}`;
        this.programCounter = operand;
        this.recordLog(mnemonic, opcode, operand, `BRP ${operand}`, this.accumulator, this.programCounter, comment);
        return; // Exit the switch and method.

      case 7: // BRZ
        mnemonic = "BRZ";
        if (this.accumulator === 0) {
          this.currentEquation = `BRZ ${operand} (Accumulator is zero)`;
          this.programCounter = operand;
          comment = `Branch to address ${operand} if the accumulator is zero`;
          this.recordLog(mnemonic, opcode, operand, `BRZ ${operand}`, this.accumulator, this.programCounter, comment);
          return;
        } else {
          this.currentEquation = `BRZ ${operand} (Accumulator not zero)`;
          comment = `Do not branch to address ${operand} if the accumulator is not zero`;
        }
        break;

      case 8: // BRP
        mnemonic = "BRP";
        if (this.accumulator >= 0) {
          this.currentEquation = `BRP ${operand} (Accumulator is positive)`;
          this.programCounter = operand;
          comment = `Branch to address ${operand} if the accumulator is positive`;
          this.recordLog(mnemonic, opcode, operand, `BRP ${operand}`, this.accumulator, this.programCounter, comment);
          return;
        } else {
          this.currentEquation = `BRP ${operand} (Accumulator is negative)`;
          comment = `Do not branch to address ${operand} if the accumulator is negative`;
        }
        break;

      case 901: // INP
        mnemonic = "INP";
        if (this.inputs.length === 0) {
          this.currentEquation = "INP: Input expected.";
          comment = "Input expected but none provided.";
          throw new Error("Input expected.");
        }
        const inputValue = this.inputs.shift();
        this.accumulator = inputValue;
        comment = `Input value ${inputValue} into the accumulator`;
        this.currentEquation = `INP ${inputValue}`;
        break;

      case 902: // OUT
        mnemonic = "OUT";
        this.outputs.push(this.accumulator);
        comment = `Output the value in the accumulator (${this.accumulator})`;
        this.currentEquation = `OUT ${this.accumulator}`;
        break;

      case 0: // HLT
        mnemonic = "HLT";
        this.halted = true;
        comment = "Halt the program";
        this.currentEquation = "HLT: Program halted.";
        break;

      default:
        mnemonic = "???";
        comment = `Invalid opcode: ${opcode}`;
        this.currentEquation = `Invalid opcode: ${opcode}`;
        throw new Error(`Invalid opcode: ${opcode}`);
    }

    this.programCounter += 1;

    if (this.programCounter >= this.memory.length) {
      this.halted = true;
      this.currentEquation = "HALT: Instruction counter out of bounds.";
      comment = "Program counter out of bounds.";
      throw new Error("Instruction counter out of bounds.");
    }

    this.recordLog(mnemonic, opcode, operand, `${mnemonic} ${operand}`, this.accumulator, this.programCounter, comment);
  }

  /**
   * Records a log entry with the provided details.
   *
   * @param {string} mnemonic - The mnemonic of the instruction.
   * @param {number} opcode - The opcode of the instruction.
   * @param {number} mailbox - The mailbox address.
   * @param {string} instruction - The full instruction.
   * @param {number} accumulator - The current value of the accumulator.
   * @param {number} programCounter - The current value of the program counter.
   * @param {string} [comment] - An optional comment about the log entry.
   */
  recordLog(mnemonic, opcode, mailbox, instruction, accumulator, programCounter, comment) {
    this.logs.push({
      mnemonic,
      opcode,
      mailbox,
      instruction,
      accumulator,
      programCounter,
      comment,
    });
  }

  /**
   * Runs the loaded program until it halts.
   */
  run() {
    try {
      while (!this.halted) {
        this.step();
      }
    } catch (error) {
      // Handle errors gracefully if needed.
      console.error(error.message);
    }
  }

  /**
   * Resets the LMC to its initial state.
   */
  reset() {
    this.memory.fill(0);
    this.accumulator = 0;
    this.programCounter = 0;
    this.halted = false;
    this.inputs = [];
    this.outputs = [];
    this.currentEquation = "LMC reset.";
  }

  /**
   * Adds a value to the input queue.
   *
   * @param {number} value - The value to be added to the input queue.
   */
  addInput(value) {
    this.inputs.push(value);
    this.currentEquation = `Input added: ${value}`;
  }

  /**
   * Retrieves and removes the next output value from the output queue.
   *
   * @returns {number|null} The next output value or null if none.
   */
  getOutput() {
    const output = this.outputs.shift() || null;
    if (output !== null) {
      this.currentEquation = `Output retrieved: ${output}`;
    }
    return output;
  }

  /**
   * Returns the current equation being executed.
   *
   * @returns {string} The current equation.
   */
  getCurrentEquation() {
    return this.currentEquation;
  }

  /**
   * Retrieves the logs.
   *
   * @returns {Array} The array of log entries.
   */
  getLogs() {
    return this.logs;
  }
  
  /**
   * Clears the logs by resetting the logs array to an empty array.
   */
  clearLogs() {
    this.logs = [];
  }
}

export default LMC;
