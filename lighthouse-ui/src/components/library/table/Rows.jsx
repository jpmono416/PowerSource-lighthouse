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
  noElementsMessage,
}) {
  const navigate = useNavigate();

  const handleClick = (row) => {
    navigate(getLink(row));
  };

  if (!rowData || isLoading) return <Skeleton columns={columns} padX={padX} />;

  if (rowData.length === 0)
    return (
      <tr>
        <td className="text-primary-800">{noElementsMessage}</td>
      </tr>
    );

  return rowData.map((row) => {
    return (
      <tr
        key={getKey(row)}
        className="contents even:bg-secondary-100 hover:bg-primary-50 hover:bg-opacity-50 cursor-pointer"
        onClick={() => handleClick(row)}
        role="row"
      >
        <RowCells rowData={row} columns={columns} padX={padX} />
      </tr>
    );
  });
}
