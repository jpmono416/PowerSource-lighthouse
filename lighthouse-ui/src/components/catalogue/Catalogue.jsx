import { useMemo } from "react";

import { useAppContext } from "../../hooks/contexts/AppContext";
import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import CatalogueFilter from "./filter/CatalogueFilter";
import getCatalogueTableConfig from "../../utils/tableConfigs/catalogueTableConfig";
import Table from "../library/table/Table";
import RenderedErrors from "../library/RenderedErrors";

export default function Catalogue() {
  const { screenSize } = useAppContext();
  const { results, isLoading, errors } = useLLMCatalogueContext();

  const catalogueTableConfig = useMemo(() => {
    return getCatalogueTableConfig(screenSize);
  }, [screenSize]);

  if (errors) return <RenderedErrors errors={errors} />;

  return (
    <div className="mt-8">
      <CatalogueFilter isDisabled={isLoading} />
      <Table
        config={catalogueTableConfig}
        data={results}
        isLoading={isLoading}
        noElementsMessage={"No matching LLMs found"}
      />
      <div className="h-[1px] bg-secondary-700 mt-8" />
    </div>
  );
}
