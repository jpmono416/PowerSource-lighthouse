import { useMemo } from "react";

import { useAppContext } from "../../hooks/contexts/AppContext";
import { useLLMCatalogueContext } from "../../hooks/contexts/LLMCatalogueContext";
import CatalogueFilter from "./filter/CatalogueFilter";
import getCatalogueTableConfig from "../../utils/tableConfigs/catalogueTableConfig";
import Table from "../library/table/Table";
import RenderedErrors from "../library/RenderedErrors";
import AddLLMModalButton from "./AddLLMModalButton";

export default function Catalogue() {
  const { activeUser, screenSize, isAdmin } = useAppContext();
  const { results, isLoading, errors } = useLLMCatalogueContext();

  const catalogueTableConfig = useMemo(() => {
    return getCatalogueTableConfig(screenSize);
  }, [screenSize]);

  if (!activeUser) return;
  if (errors) return <RenderedErrors errors={errors} />;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-[1fr_auto] items-center  mb-6">
        <CatalogueFilter isDisabled={isLoading} />
        {isAdmin && <AddLLMModalButton isDisabled={isLoading} />}
      </div>
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
