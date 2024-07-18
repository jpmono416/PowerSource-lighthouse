import ColumnLabels from "./ColumnLabels";
import Rows from "./Rows";

export default function Table({ config, data }) {
  const cellPadding = 1;

  return (
    <table className="grid grid-cols-[repeat(3,auto)]">
      <thead className="contents">
        <tr className="contents">
          <ColumnLabels columnConfig={config.columns} padX={cellPadding} />
        </tr>
      </thead>
      <tbody className="contents">
        <Rows
          rowData={data}
          getKey={config.getRowKey}
          getLink={config.getRowLink}
          columns={config.columns}
          padX={cellPadding}
        />
      </tbody>
    </table>
  );
}
