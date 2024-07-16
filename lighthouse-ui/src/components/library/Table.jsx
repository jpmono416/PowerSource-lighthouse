import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export default function Table({ config, data }) {
  const cellClasses = "p-2";
  const navigate = useNavigate();

  const columnLabels = config.columns.map((column, i) => {
    const columnLabelClasses = classNames(cellClasses, {
      "border-l-[1px] border-secondary-300 text-lg font-light": i !== 0,
    });
    return (
      <td
        key={column.label}
        className="py-2 border-b-[1px] border-secondary-500 mb-2"
      >
        <div className={columnLabelClasses}>{column.label}</div>
      </td>
    );
  });

  const getRowData = (row) =>
    config.columns.map((column) => {
      const classes = classNames(
        cellClasses,
        "w-full h-full flex flex-col justify-center"
      );
      return (
        <td
          key={`${config.getRowKey(row)}${column.label}`}
          style={{ backgroundColor: "inherit" }}
          className={classes}
        >
          {column.getCell(row) || "-"}
        </td>
      );
    });

  const rows = data.map((row) => {
    return (
      <tr
        key={config.getRowKey(row)}
        className="contents even:bg-secondary-100 hover:bg-primary-50 hover:bg-opacity-50 cursor-pointer"
        onClick={() => navigate(config.getRowLink(row))}
      >
        {getRowData(row)}
      </tr>
    );
  });

  return (
    <table className="grid grid-cols-[repeat(3,auto)]">
      <thead className="contents">
        <tr className="contents">{columnLabels}</tr>
      </thead>
      <tbody className="contents">{rows}</tbody>
    </table>
  );
}
