export const instructionDataset = [
  {
    id: "1",
    name: "ADD 2 numbers and SUB 1 number",
    instructions: [
      { label: "", mnemonic: "INP", address: "" },
      { label: "", mnemonic: "STA", address: "VALUE" },
      { label: "", mnemonic: "LDA", address: "ZERO" },
      { label: "", mnemonic: "STA", address: "SUM" },
      { label: "", mnemonic: "STA", address: "COUNT" },
      { label: "LOOP", mnemonic: "LDA", address: "SUM" },
      { label: "", mnemonic: "ADD", address: "VALUE" },
      { label: "", mnemonic: "STA", address: "SUM" },
      { label: "", mnemonic: "LDA", address: "COUNT" },
      { label: "", mnemonic: "SUB", address: "VALUE" },
      { label: "", mnemonic: "BRP", address: "DONE" },
      { label: "", mnemonic: "BRA", address: "LOOP" },
      { label: "DONE", mnemonic: "LDA", address: "SUM" },
      { label: "", mnemonic: "OUT", address: "" },
      { label: "", mnemonic: "HLT", address: "" },
      { label: "VALUE", mnemonic: "DAT", address: "" },
      { label: "SUM", mnemonic: "DAT", address: "" },
      { label: "COUNT", mnemonic: "DAT", address: "" },
      { label: "ZERO", mnemonic: "DAT", address: "000" },
      { label: "ONE", mnemonic: "DAT", address: "001" },
    ],
  },
  {
    id: "2",
    name: "Addition of 2 numbers",
    instructions: [
      { label: "start", mnemonic: "INP", address: "" },
      { label: "", mnemonic: "STA", address: "18" },
      { label: "", mnemonic: "INP", address: "" },
      { label: "", mnemonic: "ADD", address: "18" },
      { label: "", mnemonic: "OUT", address: "" },
      { label: "", mnemonic: "HLT", address: "" }
    ]
  },
  {
    id: "3",
    name: "Subtraction of 2 numbers",
    instructions: [
      { label: "", mnemonic: "INP", address: "" },
      { label: "", mnemonic: "STA", address: "19" },
      { label: "", mnemonic: "INP", address: "" },
      { label: "", mnemonic: "SUB", address: "19" },
      { label: "", mnemonic: "OUT", address: "" },
      { label: "", mnemonic: "HLT", address: "" }
    ]
  }
];
