import { useState } from "react";

import RenderedErrors from "../../library/RenderedErrors";

export default function ReleaseDateFilter({
  isDisabled,
  updateQueryValueFor,
  validator,
  defaultValues,
}) {
  const [error, setError] = useState(validator.validateFrom()[1] || "");

  const getValuesFromInputs = () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    return [from, to];
  };

  const updateValidation = (from, to) => {
    validator.setFrom(from);
    validator.setTo(to);
    setError(validator.validateFrom()[1]);
  };

  const handleChange = () => {
    const [from, to] = getValuesFromInputs();
    updateQueryValueFor("createdDateFrom", from);
    updateQueryValueFor("createdDateTo", to);
    updateValidation(from, to);
  };

  const labelClasses = "block text-secondary-50 font-light mb-1";
  const inputClasses = "px-2 py-1 mb-4";

  return (
    <>
      <label className={labelClasses} htmlFor="from">
        From
      </label>
      <input
        className={inputClasses}
        title="From"
        type="date"
        id="from"
        disabled={isDisabled}
        onChange={handleChange}
        defaultValue={defaultValues?.createdDateFrom || ""}
      />
      <label className={labelClasses} htmlFor="to">
        To
      </label>
      <input
        title="To"
        id="to"
        className={inputClasses}
        type="date"
        disabled={isDisabled}
        onChange={handleChange}
        defaultValue={defaultValues?.createdDateTo || ""}
      />
      {error && <RenderedErrors errors={[error]} />}
    </>
  );
}
