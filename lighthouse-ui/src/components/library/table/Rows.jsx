import { useNavigate } from "react-router-dom";

import RowCells from "./RowCells";
import Skeleton from "./Skeleton";

export default function Rows({
  rowData,
  columns,
  getKey,
  getLink,
  padX,
  isLoading,
}) {
  const navigate = useNavigate();

  const handleClick = (row) => {
    if (!getLink || !getLink(row)) return;
    navigate(getLink(row));
  };

  if (!rowData || isLoading) return <Skeleton columns={columns} padX={padX} />;

  return rowData.map((row) => {
    return (
      <tr
        key={getKey(row)}
        className="contents even:bg-secondary-100 hover:bg-primary-50 hover:bg-opacity-50 cursor-pointer"
        onClick={() => handleClick(row)}
      >
        <RowCells rowData={row} columns={columns} padX={padX} />
      </tr>
    );
  });
}
