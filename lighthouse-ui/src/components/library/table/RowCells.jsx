export default function RowCells({ rowData, columns, padX }) {
  return columns.map((column) => {
    return (
      <td
        key={column.label}
        className="w-full h-full flex flex-col justify-center"
        style={{
          backgroundColor: "inherit",
          paddingLeft: `${padX / 2}rem`,
          paddingRight: `${padX / 2}rem`,
        }}
      >
        {column.getCell(rowData) || "-"}
      </td>
    );
  });
}
