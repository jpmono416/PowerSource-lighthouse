import { useLocation } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function TabbedRoutes({ paths }) {
  const location = useLocation();

  const renderedTabs = paths.map((path) => {
    const isActive = location.pathname.startsWith(path.pathname);
    const classes = classNames(
      "px-4 py-2 text-secondary-800 text-2xl rounded-t font-light ",
      {
        "hover:bg-secondary-50 hover:bg-opacity-60": !isActive,
        "bg-secondary-50 ": isActive,
      }
    );
    return (
      <Link to={path.pathname} className={classes} key={path.pathname}>
        {path.label}
      </Link>
    );
  });

  const content = useMemo(() => {
    return paths.find((path) => location.pathname.startsWith(path.pathname))
      ?.element;
  }, [location]);

  return (
    <div className="py-12 px-2 bg-secondary-100 bg-opacity-95">
      <div className="flex flex-row ">{renderedTabs}</div>
      <div className="bg-secondary-50 h-full p-2">{content}</div>
    </div>
  );
}
