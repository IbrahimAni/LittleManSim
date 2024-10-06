export const parseAndTransformProgram = (code) => {
  if (typeof code !== 'string') {
    console.error('Input code must be a string.');
    return [];
  }

  const lines = code.split(/\r?\n/);
  const program = [];

  // Comprehensive list of known mnemonics
  const knownMnemonics = [
    "INP", "OUT", "ADD", "SUB", "STA", "HLT",
    "BRP", "BRZ", "BRA", "LDA", "DAT" // Add more as needed
  ];

  lines.forEach((line, index) => {
    // Remove pipes and trim whitespace
    const trimmedLine = line.replace(/\|/g, '').trim();

    // Skip empty lines and comments
    if (trimmedLine === '' || trimmedLine.startsWith('//')) return;

    // Split the line by whitespace
    const parts = trimmedLine.split(/\s+/);

    // Initialize default values
    let label = "";
    let mnemonic = "";
    let address = "";
    let value = "";

    if (parts.length === 3) {
      // Assuming format: Label Mnemonic Value/Address
      const [part1, part2, part3] = parts;
      const part2Upper = part2.toUpperCase();

      if (knownMnemonics.includes(part2Upper)) {
        label = part1;
        mnemonic = part2Upper;
        address = part3;
      } else {
        console.error(`Unknown mnemonic on line ${index + 1}: "${line}"`);
        return;
      }
    } else if (parts.length === 2) {
      // Could be Mnemonic Address or Label Mnemonic
      const [part1, part2] = parts;
      const part1Upper = part1.toUpperCase();
      const part2Upper = part2.toUpperCase();

      if (knownMnemonics.includes(part1Upper)) {
        // Mnemonic Address
        mnemonic = part1Upper;
        address = part2;
      } else if (knownMnemonics.includes(part2Upper)) {
        // Label Mnemonic
        label = part1;
        mnemonic = part2Upper;
      } else {
        console.error(`Unknown mnemonic on line ${index + 1}: "${line}"`);
        return;
      }
    } else if (parts.length === 1) {
      // Only mnemonic (e.g., HLT)
      const [part1] = parts;
      const part1Upper = part1.toUpperCase();

      if (knownMnemonics.includes(part1Upper)) {
        mnemonic = part1Upper;
      } else {
        console.error(`Unknown mnemonic on line ${index + 1}: "${line}"`);
        return;
      }
    } else {
      console.error(`Invalid instruction format on line ${index + 1}: "${line}"`);
      return;
    }

    // Transform the instruction based on mnemonic
    if (mnemonic === "DAT") {
      if (label === "") {
        console.error(`DAT instruction missing label on line ${index + 1}: "${line}"`);
        return;
      }
      value = address; // For DAT, the third part is the value
      program.push({
        address: label,
        data: "DAT",
        value: value || ""
      });
    } else {
      program.push({
        label: label || "",
        mnemonic: mnemonic,
        address: (mnemonic !== "DAT" && address) || ""
      });
    }
  });

  return program;
};