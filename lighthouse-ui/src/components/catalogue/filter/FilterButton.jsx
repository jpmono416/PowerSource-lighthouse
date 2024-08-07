import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import FilterModal from "./FilterModal";
import classNames from "classnames";
export default function FilterButton({
  isDisabled,
  updateQueryValueFor,
  refreshResults,
  defaultValues,
  filterOptions,
}) {
  const [doShowModal, setDoShowModal] = useState(false);

  const handleToggleModal = () => {
    setDoShowModal((curr) => !curr);
  };

  const handleApplyFilters = () => {
    setDoShowModal(false);
    refreshResults();
  };

  return (
    <>
      <button
        disabled={isDisabled}
        aria-label="filter"
        title="Filter"
        onClick={handleToggleModal}
      >
        <CiFilter
          className={classNames("text-3xl fill-secondary-800", {
            "cursor-pointer hover:fill-green-700": !isDisabled,
            "opacity-50": isDisabled,
          })}
        />
      </button>
      <FilterModal
        aria-hidden={doShowModal ? "false" : "true"}
        refreshResults={refreshResults}
        doShow={doShowModal}
        onClose={() => setDoShowModal(false)}
        updateQueryValueFor={updateQueryValueFor}
        handleApplyFilters={handleApplyFilters}
        defaultValues={defaultValues}
        filterOptions={filterOptions}
      />
    </>
  );
}
