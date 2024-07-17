import classNames from "classnames";

export default function ColumnLabel({ column, isFirstElement, padX = 0 }) {
  const columnLabelClasses = classNames({
    "border-l-[1px] border-secondary-300 text-lg font-light p-inherit":
      !isFirstElement,
  });

  return (
    <td className="py-2 border-b-[1px] border-secondary-500 mb-2">
      <div
        className={columnLabelClasses}
        style={{
          paddingLeft: `${padX / 2}rem`,
          paddingRight: `${padX / 2}rem`,
        }}
      >
        {column.label}
      </div>
    </td>
  );
}
