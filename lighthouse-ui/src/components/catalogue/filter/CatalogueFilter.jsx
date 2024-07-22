import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";

export default function CatalogueFilter({
  isDisabled,
  updateQueryValueFor,
  refreshResults,
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 mb-6">
      <SearchBar
        refreshResults={refreshResults}
        updateQueryValueFor={updateQueryValueFor}
        isDisabled={isDisabled}
      />
      <FilterButton
        refreshResults={refreshResults}
        updateQueryValueFor={updateQueryValueFor}
        isDisabled={isDisabled}
      />
    </div>
  );
}
