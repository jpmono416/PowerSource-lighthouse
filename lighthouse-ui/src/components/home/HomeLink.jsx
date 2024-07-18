import { Link } from "react-router-dom";

export default function HomeLink({ imgSrc, label, description, to }) {
  return (
    <Link
      to={to}
      className="cursor-pointer select-none grid grid-cols-[25%_1fr] gap-x-2 items-center bg-secondary-50 bg-opacity-90 p-2 rounded shadow group group hover:bg-opacity-85"
    >
      <div className="h-full w-full overflow-hidden ">
        <img
          src={imgSrc}
          className="w-full aspect-square content-cover filter grayscale group-hover:filter-none"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl text-primary-700 group-hover:text-primary-800 font-semibold tracking-wide">
          {label}
        </h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
