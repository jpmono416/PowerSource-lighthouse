import catalogueDummyData from "../../dummyData/catalogueData";
import catalogueTableConfig from "../../utils/tableConfigs/catalogueTableConfig";
import Table from "../library/table/Table";

export default function Catalogue() {
  return (
    <div className="mt-8">
      <Table config={catalogueTableConfig} data={catalogueDummyData} />
      <div className="h-[1px] bg-secondary-700 mt-8" />
    </div>
  );
}
