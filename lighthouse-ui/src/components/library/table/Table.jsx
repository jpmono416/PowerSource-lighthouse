import LoadingSpinner from "../LoadingSpinner";
import ColumnLabels from "./ColumnLabels";
import Rows from "./Rows";

export default function Table({ config, data, isLoading, noElementsMessage }) {
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
          <tr className="contents" role="rowheader">
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
            noElementsMessage={noElementsMessage}
          />
        </tbody>
      </table>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-50 bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
