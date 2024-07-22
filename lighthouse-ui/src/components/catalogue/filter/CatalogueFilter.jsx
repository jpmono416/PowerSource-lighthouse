import { useLLMCatalogueContext } from "../../../hooks/contexts/LLMCatalogueContext";
import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";

export default function CatalogueFilter({ isDisabled }) {
  const { updateQueryValueFor, refreshResults, queryValues } =
    useLLMCatalogueContext();

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 mb-6">
      <SearchBar
        refreshResults={refreshResults}
        updateQueryValueFor={updateQueryValueFor}
        isDisabled={isDisabled}
        defaultValue={queryValues.name || ""}
      />
      <FilterButton
        refreshResults={refreshResults}
        updateQueryValueFor={updateQueryValueFor}
        isDisabled={isDisabled}
        defaultValues={queryValues}
      />
    </div>
  );
}
