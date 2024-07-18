import ColumnLabel from "./ColumnLabel";

export default function ColumnLabels({ columnConfig, padX }) {
  return columnConfig.map((column, i) => {
    const isFirstElement = i === 0;
    return (
      <ColumnLabel
        key={column.label}
        column={column}
        isFirstElement={isFirstElement}
        padX={padX}
      />
    );
  });
}
