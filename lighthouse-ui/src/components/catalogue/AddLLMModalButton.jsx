import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function AddLLMModalButton({ isDisabled }) {
  return (
    <Link to="/models/catalogue/add">
      <IoIosAdd
        className={classNames("text-4xl  fill-secondary-800", {
          "cursor-pointer hover:fill-green-700": !isDisabled,
          "opacity-50": isDisabled,
        })}
      />
    </Link>
  );
}
