export default function Skeleton({ columns, padX }) {
  const skeletonRows = [];
  for (let i = 0; i < 6; i++) {
    const skeletonCells = columns.map((column) => (
      <td
        key={column.label}
        className="w-full h-12 flex flex-col justify-center animate-pulse text-opacity-0"
        style={{
          backgroundColor: "inherit",
          paddingLeft: `${padX / 2}rem`,
          paddingRight: `${padX / 2}rem`,
        }}
      />
    ));
    skeletonRows.push(
      <tr key={i} className="contents even:bg-secondary-100">
        {skeletonCells}
      </tr>
    );
  }
  return skeletonRows;
}
