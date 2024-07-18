import { Link } from "react-router-dom";
import AuthenticationControls from "./AuthenticationControls";

export default function Header() {
  return (
    <div className="p-4  shadow-sm grid grid-cols-[1fr_auto]">
      <Link to="/">
        <h1 className="text-primary-800  tracking-wider text-3xl">
          L<span className="text-secondary-800 font-light">ightHouse</span>
        </h1>
      </Link>

      <div className="flex flex-row gap-2">
        <AuthenticationControls />
      </div>
      <div className="absolute inset-0 bg-secondary-50 -z-20" />
    </div>
  );
}
