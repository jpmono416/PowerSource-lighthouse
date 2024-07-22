import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";

import CatalogueFilter from "./filter/CatalogueFilter";
import catalogueTableConfig from "../../utils/tableConfigs/catalogueTableConfig";
import Table from "../library/table/Table";

export default function Catalogue() {
  const { results, refreshResults, isLoading, updateQueryValueFor } =
    useLLMCatalogueContext();

  console.log(results?.length);

  return (
    <div className="mt-8">
      <CatalogueFilter
        isDisabled={isLoading}
        updateQueryValueFor={updateQueryValueFor}
        refreshResults={refreshResults}
      />
      <Table
        config={catalogueTableConfig}
        data={results}
        isLoading={isLoading}
      />
      <div className="h-[1px] bg-secondary-700 mt-8" />
    </div>
  );
}
