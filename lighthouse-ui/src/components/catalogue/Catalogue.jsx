import { useLocation } from "react-router";
import catalogueDummyData from "../../dummyData/catalogueData";
import Table from "../library/Table";

export default function Catalogue() {
  const tableConfig = {
    getRowKey: (row) => row.id,
    getRowLink: (row) => `/models/catalogue/${row.id}`,
    columns: [
      {
        label: "Name",
        getCell: (row) => row.name,
      },
      {
        label: "Organisation",
        getCell: (row) => row.organisation,
      },
      {
        label: "Description",
        getCell: (row) => row.description,
      },
    ],
  };

  return (
    <div className="mt-8">
      <Table config={tableConfig} data={catalogueDummyData} />
      <div className="h-[1px] bg-secondary-700 mt-8" />
    </div>
  );
}
