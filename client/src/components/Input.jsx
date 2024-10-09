import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import useStore from "../store/useStore";
import { toast } from "react-toastify";

const Input = () => {
  // Access the Zustand store
  const { showInputModal, modalMessage, submitInput  } = useStore();

  // Local state for the input value and error handling
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // If the modal should not be shown, render nothing
  // if (!showInputModal) return null;

  // Handler for input change
  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setInputValue(value);
      setError("");
    } else {
      setError("Please enter a valid number up to 10 digits.");
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setError("Input cannot be empty.");
      return;
    }
    submitInput(inputValue);
    setInputValue("");
    setError("");
  };

  useEffect(() => {
    if(modalMessage != ""){
      toast.success(modalMessage);
    }
  },[modalMessage])

  return (
    <div>
      <p className="text-xs font-mono text-red-400">{modalMessage}</p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded shadow-md flex flex-col space-y-4"
        data-testid="input-section"
        aria-labelledby="input-section-title"
        role="region"
      >
        {/* Label for accessibility */}
        <label
          htmlFor="user-input"
          className="text-sm font-semibold font-mono text-gray-700"
        >
          Input
        </label>

        {/* Stylized Input Field */}
        <input
          type="text"
          id="user-input"
          name="user-input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter value"
          className={`bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition duration-200 ease-in-out`}
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          aria-required="true"
          data-testid="input-field"
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs" data-testid="input-error">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#F97316] hover:bg-[#D97316] text-white font-mono text-sm py-2 px-4 rounded shadow-sm transition duration-200 ease-in-out flex items-center justify-center"
          data-testid="submit-button"
          aria-label="Submit input value"
        >
          <FaPaperPlane className="mr-2" aria-hidden="true" />
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
