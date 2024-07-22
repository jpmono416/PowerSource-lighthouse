import ColumnLabels from "./ColumnLabels";
import Rows from "./Rows";

export default function Table({ config, data, isLoading }) {
  const cellPadding = 1;

  return (
    <div className="relative" id="table-wrapper">
      <table
        className="grid max-w-full overflow-hidden text-ellipsis"
        style={{
          gridTemplateColumns: `repeat(${config.columns.length}, auto)`,
        }}
      >
        <thead className="contents">
          <tr className="contents">
            <ColumnLabels columnConfig={config.columns} padX={cellPadding} />
          </tr>
        </thead>
        <tbody className="contents">
          <Rows
            isLoading={isLoading}
            rowData={data}
            getKey={config.getRowKey}
            getLink={config.getRowLink}
            columns={config.columns}
            padX={cellPadding}
          />
        </tbody>
      </table>
    </div>
  );
}
