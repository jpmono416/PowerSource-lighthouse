import classNames from "classnames";
import modelDataTableConfig from "../../../utils/tableConfigs/modelDataTableConfig";
import { Fragment } from "react";

export default function DataTable({ model }) {
  const cellClasses = "px-2 py-1";

  const getRowDataEl = (rowData, separator) => {
    const values = separator ? rowData.split(separator) : [rowData];
    const elements = values.map((value) => <li key={value}>{value}</li>);
    return (
      <td className={classNames(cellClasses, "w-full")}>
        <ul>{elements}</ul>
      </td>
    );
  };

  const rows = modelDataTableConfig.rows.map((row) => {
    return (
      <Fragment key={row.key}>
        <tr className="odd:bg-secondary-100 align-top border-b-[1px] border-secondary-50 last:border-0">
          <th
            className={classNames(
              cellClasses,
              "bg-secondary-700 text-secondary-50 font-normal text-nowrap"
            )}
          >
            {row.key}
          </th>
          {getRowDataEl(row.getValue(model), row.separator)}
        </tr>
      </Fragment>
    );
  });

  return (
    <div className="mb-6">
      <table className="w-full min-w-[50vw] border-b-[5px] border-green-400">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
