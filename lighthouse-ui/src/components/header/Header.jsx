import { Link } from "react-router-dom";
import Button from "../library/Button";

export default function Header() {
  return (
    <div className="p-4 bg-secondary-50 bg-opacity-50 shadow-sm grid grid-cols-[1fr_auto]">
      <Link to="/">
        <h1 className="text-primary-800 font-semibold tracking-wider text-3xl">
          LightHouse
        </h1>
      </Link>
      <div className="flex flex-row gap-2">
        <Button primary>Register</Button>
        <Button>Log In</Button>
      </div>
    </div>
  );
}
