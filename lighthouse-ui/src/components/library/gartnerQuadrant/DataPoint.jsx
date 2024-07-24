import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DataPoint({ label, x, y, gradient, link }) {
  const navigate = useNavigate();

  const dataPointOrigin = {
    left: `50%`,
    bottom: `50%`,
    backgroundColor: gradient.getColourAt(50),
  };
  const dataPointDestination = {
    left: `${x}%`,
    bottom: `${y}%`,
    backgroundColor: gradient.getColourAt((x + y) / 2),
  };
  const [dataPointPosition, setDataPointPosition] = useState(dataPointOrigin);

  const handleClick = () => {
    if (!link) return;
    navigate(link);
  };

  useEffect(() => {
    setDataPointPosition(dataPointDestination);
  }, []);

  const labelPosition = {
    left: x < 50 ? `105%` : undefined,
    right: x > 50 ? `105%` : undefined,
    top: y > 50 ? `105%` : undefined,
    bottom: y < 50 ? `105%` : undefined,
  };

  return (
    <div
      className="absolute w-[3.5%] aspect-square bg-green-500 rounded-full translate-x-[-50%] translate-y-[50%] cursor-pointer group z-0 hover:z-10"
      style={{
        ...dataPointPosition,
        transition: "bottom 1s ease, left 1s ease",
      }}
      onClick={handleClick}
    >
      <div
        className="absolute hidden group-hover:block px-2 py-1 bg-green-300"
        style={labelPosition}
      >
        {label}
      </div>
    </div>
  );
}
