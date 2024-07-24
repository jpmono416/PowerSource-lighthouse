import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function FilterDropdown({
  options,
  isDisabled,
  onChange,
  defaultValue,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");

  const dropdownOptions = [
    <option key={"default"} value={""}>
      Any
    </option>,
  ];

  options.forEach((option) => {
    let optionLabel = option.slice(0, 32);
    if (optionLabel !== option) optionLabel += "...";
    dropdownOptions.push(
      <option key={option} value={option} role="menuitem">
        {optionLabel}
      </option>
    );
  });

  const handleChange = (e) => {
    const selection = e.target.value;
    setSelectedOption(selection);
    onChange(selection);
  };

  const handleClearFilter = () => {
    setSelectedOption("");
    onChange("");
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 ">
      <select
        role="menu"
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
          title="Clear filter"
          className="text-2xl text-primary-400 cursor-pointer hover:text-primary-500"
          onClick={handleClearFilter}
        />
      )}
    </div>
  );
}
