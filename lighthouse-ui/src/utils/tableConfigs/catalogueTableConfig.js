const catalogueTableConfig = {
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

export default catalogueTableConfig;
