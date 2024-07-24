import ScreenSizes from "../enums/ScreenSizes";

const rowDataConfig = {
  getRowKey: (row) => row.id,
  getRowLink: (row) => `/models/catalogue/${row.id}`,
};

const allColumns = [
  {
    label: "Name",
    getCell: (row) => row.name ?? "-",
  },
  {
    label: "Organisation",
    getCell: (row) => row.organization ?? "-",
  },
  {
    label: "Description",
    getCell: (row) => {
      const fullDescription = row.description ?? "-";
      let truncatedDescription = fullDescription.slice(0, 64);
      if (truncatedDescription !== fullDescription)
        truncatedDescription += "...";
      return truncatedDescription;
    },
  },
  {
    label: "Created",
    getCell: (row) =>
      row.created_date
        ? new Date(row.created_date).toLocaleDateString("en-gb")
        : "-",
  },
  {
    label: "Modality",
    getCell: (row) => row.modality ?? "-",
  },
  {
    label: "Access",
    getCell: (row) => row.access ?? "-",
  },
  {
    label: "Licence",
    getCell: (row) => row.license ?? "-",
  },
];

const generateConfig = (columnCount) => {
  return { ...rowDataConfig, columns: allColumns.slice(0, columnCount) };
};

export default function getCatalogueTableConfig(screenSize) {
  if (screenSize === ScreenSizes.SMALL) return generateConfig(3);
  if (screenSize === ScreenSizes.MEDIUM) return generateConfig(3);
  if (screenSize === ScreenSizes.LARGE) return generateConfig(4);
  if (screenSize === ScreenSizes.EXTRA_LARGE) return generateConfig(7);
}
