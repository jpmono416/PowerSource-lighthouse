import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function FilterDropdown({ options, isDisabled, onChange }) {
  const [selectedOption, setSelectedOption] = useState("");

  const dropdownOptions = [
    <option key={"default"} value={""}>
      Any
    </option>,
  ];

  options.forEach((option) => {
    let optionLabel = option.slice(0, 32);
    if (optionLabel !== option) optionLabel += "...";
    dropdownOptions.push(
      <option key={option} value={option}>
        {optionLabel}
      </option>
    );
  });

  const handleChange = (e) => {
    const selection = e.target.value;
    setSelectedOption(selection);
    onChange(selection);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 ">
      <select
        placeholder="Any"
        value={selectedOption}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full p-2 text-nowrap text-ellipsis"
      >
        {dropdownOptions}
      </select>
      {selectedOption && (
        <FaTrash
          className="text-2xl text-primary-400 cursor-pointer hover:text-primary-500"
          onClick={() => setSelectedOption("")}
        />
      )}
    </div>
  );
}
