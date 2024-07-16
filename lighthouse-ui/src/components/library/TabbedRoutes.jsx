import { useLocation } from "react-router";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function TabbedRoutes({ paths }) {
  const location = useLocation();
  console.log(location.pathname);

  const renderedTabs = paths.map((path) => {
    const classes = classNames("px-4 text-primary-700 text-2xl rounded-t", {
      "text-secondary-50 text-semibold hover:bg-secondary-100 hover:bg-opacity-70 hover:text-primary-700":
        location.pathname !== path.pathname,
      "bg-secondary-100 bg-opacity-90 text-bold":
        location.pathname === path.pathname,
    });
    return (
      <Link to={path.pathname} className={classes}>
        {path.label}
      </Link>
    );
  });

  const content = useMemo(() => {
    return paths.find((path) => path.pathname === location.pathname)?.element;
  }, [location]);

  return (
    <div className="py-12 px-2 bg-primary-700 bg-opacity-[98%]">
      <div className="flex flex-row">{renderedTabs}</div>
      <div className="bg-secondary-100 bg-opacity-90 h-full p-2">{content}</div>
    </div>
  );
}
