import React, { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { instructionDataset } from "../data/instructions";
import useStore from "../store/useStore";
import { toast } from "react-toastify";

const InstructionLoader = () => {
  const setCode = useStore((state) => state.setCode);
  const currentInstructionId = useStore((state) => state.currentInstructionId);
  const setCurrentInstructionId = useStore(
    (state) => state.setCurrentInstructionId
  );

  // State to track the selected instruction
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  // Helper function to format instructions for display
  const formatInstructions = (instructions) => {
    return instructions
      .map((instr) => {
        const label =
          instr.label && instr.label.trim() !== "" ? `${instr.label}` : "";
        const mnemonic = instr.mnemonic || "";
        const address = instr.address || "";

        // Define column widths
        const labelWidth = 5;
        const mnemonicWidth = 3;
        const addressWidth = 3;

        // Pad each part to ensure alignment
        const labelPadded = label.padEnd(labelWidth, " ");
        const mnemonicPadded = mnemonic.padEnd(mnemonicWidth, " ");
        const addressPadded = address.padEnd(addressWidth, " ");

        // Combine into a single line
        // Makes the instruction uppercase for consistency
        return `${labelPadded.toUpperCase()} | ${mnemonicPadded.toUpperCase()} | ${addressPadded.toUpperCase()}`;
      })
      .join("\n");
  };

  // Handle selection and loading of instructions
  const handleSelection = (selectedGroup) => {
    if (selectedGroup) {
      const newProgram = formatInstructions(selectedGroup.instructions);

      // Prevent duplicate loading
      if (currentInstructionId === selectedGroup.id) {
        toast.warn(
          "This instruction selected is already loaded into the editor."
        );
        return;
      }

      // Overwrite previous instruction with the new one
      setCode(newProgram);
      toast.success("Instruction group loaded successfully!");
      setCurrentInstructionId(selectedGroup.id);

      // Set the selected instruction in the state
      setSelectedInstruction(selectedGroup);
    }
  };

  return (
    <div
      className="w-full max-w-2xl p-4 bg-gray-100 rounded-md shadow-md mt-4 relative z-50"
      data-testid="instruction-loader-container"
    >
      <Listbox onChange={handleSelection} value={selectedInstruction}>
        {({ open }) => (
          <>
            <Label
              className="block text-sm font-medium text-gray-700 mb-2 font-mono"
              data-testid="instruction-loader-label"
            >
              Select Instruction
            </Label>
            <div className="relative">
              <ListboxButton
                className="relative w-full cursor-default rounded-md border border-[#F97316] bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] sm:text-sm"
                data-testid="instruction-loader-button"
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <span className="block truncate font-mono">
                  {selectedInstruction
                    ? selectedInstruction.name // Show selected instruction's name
                    : "--Select an instruction--"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              {open && (
                <ListboxOptions
                  className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm font-mono"
                  data-testid="instruction-loader-options"
                  aria-label="Instruction Options"
                >
                  {instructionDataset.map((instruction) => (
                    <ListboxOption
                      key={instruction.id}
                      value={instruction}
                      className={({ focus }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          focus ? "bg-indigo-600 text-white" : "text-gray-900"
                        }`
                      }
                      data-testid={`instruction-option-${instruction.id}`}
                    >
                      {({ selected, focus }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {instruction.name}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                focus ? "text-white" : "text-indigo-600"
                              }`}
                              aria-hidden="true"
                              data-testid={`instruction-option-check-${instruction.id}`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              )}
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default InstructionLoader;
