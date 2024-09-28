import React, { useState, useEffect } from "react";
import useStore from "../../store/useStore";

const Mailbox = ({ address, value, isCurrent }) => {
  // Access loadedProgram from Zustand store
  const loadedProgram = useStore((state) => state.loadedProgram);

  // Local state for mailboxes and highlighting
  const [mailboxes, setMailboxes] = useState(Array(100).fill('000'));
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(0);

  // Update mailboxes and highlights when loadedProgram changes
  useEffect(() => {
    if (loadedProgram && loadedProgram.length > 0) {
      const mailboxValues = Array(100).fill('000');
      const highlightIndexes = [];

      loadedProgram.forEach((value, index) => {
        if (index < mailboxValues.length) {
          mailboxValues[index] = String(value).padStart(3, '0'); // Pad values to 3 digits
          if (value !== 0) {
            highlightIndexes.push(index);
          }
        }
      });

      setMailboxes(mailboxValues);
      setHighlightedIndexes(highlightIndexes);
      setDisplayedCount(0); // Reset count for new program
    }
  }, [loadedProgram]);

   // Animate highlighting of mailboxes
   useEffect(() => {
    if (highlightedIndexes.length > 0 && displayedCount < highlightedIndexes.length) {
      const timer = setTimeout(() => {
        setDisplayedCount((prevCount) => prevCount + 1);
      }, 500); // Delay between highlights

      return () => clearTimeout(timer);
    }
  }, [displayedCount, highlightedIndexes]);

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md w-full" data-qa="ram-section">
      <h2 className="text-lg font-semibold mb-2 font-mono" data-qa="ram-section-title">
        RAM
      </h2>
      <div className="border p-2 rounded grid grid-cols-10 gap-1 text-xs" data-qa="ram-grid">
        {mailboxes.map((value, index) => {
          const isHighlighted = highlightedIndexes.slice(0, displayedCount).includes(index);
          return (
            <div
              key={index}
              className={`flex flex-col items-center ${
                isHighlighted ? 'border-orange-600' : 'border-gray-300'
              }`}
              data-qa={`ram-cell-${index}`}
            >
              <div
                className={`border rounded p-1 text-center w-full ${
                  isHighlighted
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-300 text-gray-300'
                }`}
                data-qa={`ram-value-${index}`}
              >
                {value}
              </div>
              <div className="text-xs text-orange-300 mt-1" data-qa={`ram-label-${index}`}>
                {String(index).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mailbox;
