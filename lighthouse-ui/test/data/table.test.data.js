export const rowData = [
  {
    field1: "row1 field1",
    field2: "row1 field2",
    field3: "row1 field3",
    field4: "",
  },
  {
    field1: "row2 field1",
    field2: "row2 field2",
    field3: "row2 field3",
    field4: "row2 field4",
  },
];

export const testConfig = {
  getRowKey: (row) => row.field1,
  getRowLink: (row) => `/${row.field1}`,
  columns: [
    {
      label: "Field 1",
      getCell: (row) => row.field1,
    },
    {
      label: "Field 2",
      getCell: (row) => row.field2,
    },
    {
      label: "Field 3",
      getCell: (row) => row.field3,
    },
    {
      label: "Field 4",
      getCell: (row) => row.field4,
    },
  ],
};
