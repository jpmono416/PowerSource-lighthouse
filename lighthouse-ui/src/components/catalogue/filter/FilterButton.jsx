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
    if (isDisabled) return;
    setDoShowModal((curr) => !curr);
  };

  const handleApplyFilters = () => {
    setDoShowModal(false);
    refreshResults();
  };

  return (
    <>
      <CiFilter
        className={classNames("text-3xl  fill-secondary-800", {
          "cursor-pointer hover:fill-green-700": !isDisabled,
          "opacity-50": isDisabled,
        })}
        onClick={handleToggleModal}
        aria-hidden={doShowModal ? "false" : "true"}
        aria-label="filter"
        title="Filter"
      />
      <FilterModal
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
