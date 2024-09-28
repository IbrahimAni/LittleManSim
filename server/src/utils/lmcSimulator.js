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
    this.instructionCounter = 0;
    this.halted = false;
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
  }

  /**
   * Executes a single instruction from memory.
   *
   * @throws {Error} If the program has halted or an invalid opcode is encountered.
   */
  step() {
    if (this.halted) {
      throw new Error("Program has halted.");
    }

    const instruction = this.memory[this.instructionCounter];
    const opcode = Math.floor(instruction / 100);
    const operand = instruction % 100;

    switch (opcode) {
      case 1: // ADD
        this.accumulator += this.memory[operand];
        break;
      case 2: // SUB
        this.accumulator -= this.memory[operand];
        break;
      case 3: // STA
        this.memory[operand] = this.accumulator;
        break;
      case 5: // LDA
        this.accumulator = this.memory[operand];
        break;
      case 6: // BRA
        this.instructionCounter = operand;
        return;
      case 7: // BRZ
        if (this.accumulator === 0) {
          this.instructionCounter = operand;
          return;
        }
        break;
      case 8: // BRP
        if (this.accumulator >= 0) {
          this.instructionCounter = operand;
          return;
        }
        break;
      case 901: // INP
        // Handle input
        break;
      case 902: // OUT
        // Handle output
        break;
      case 0: // HLT
        this.halted = true;
        break;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }

    this.instructionCounter += 1;

    if (this.instructionCounter >= this.memory.length) {
      this.halted = true;
      throw new Error("Instruction counter out of bounds.");
    }
  }

  /**
   * Runs the loaded program until it halts.
   */
  run() {
    while (!this.halted) {
      this.step();
    }
  }

  /**
   * Resets the LMC to its initial state.
   */
  reset() {
    this.memory.fill(0);
    this.accumulator = 0;
    this.instructionCounter = 0;
    this.halted = false;
  }
}

export default LMC;
