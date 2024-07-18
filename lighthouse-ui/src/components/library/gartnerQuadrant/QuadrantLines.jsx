import { useEffect, useRef } from "react";
import classNames from "classnames";

export default function QuadrantLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.getBoundingClientRect().width;
    canvas.height = canvasRef.current.getBoundingClientRect().height;

    const c = canvas.getContext("2d");

    c.strokeStyle = "rgb(25, 67, 86)";
    c.lineWidth = 2;

    c.beginPath();
    c.moveTo(canvas.width * 0.5, 0);
    c.lineTo(canvas.width * 0.5, canvas.height);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.moveTo(0, canvas.height * 0.5);
    c.lineTo(canvas.width, canvas.height * 0.5);
    c.stroke();
    c.closePath();
  }, []);

  return (
    <div
      className={classNames(
        "absolute inset-0 pointer-events-none w-full h-full "
      )}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
