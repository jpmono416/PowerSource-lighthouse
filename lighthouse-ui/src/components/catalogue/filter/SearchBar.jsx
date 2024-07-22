import classNames from "classnames";
import { CiSearch } from "react-icons/ci";
export default function SearchBar({
  refreshResults,
  isDisabled,
  updateQueryValueFor,
}) {
  const handleChange = (e) => {
    updateQueryValueFor("name", e.target.value);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (isDisabled) return;
    refreshResults();
  };

  return (
    <form className="relative" onSubmit={handleSearch}>
      <input
        className="w-full p-2"
        type="text"
        placeholder="Search models"
        onChange={handleChange}
        disabled={isDisabled}
      />
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
        <CiSearch
          type="submit"
          className={classNames("text-3xl fill-secondary-800", {
            "cursor-pointer hover:fill-green-700": !isDisabled,
            "opacity-50 cursor-default": isDisabled,
          })}
          onClick={handleSearch}
          aria-label="search"
          role="button"
          title="Search"
        />
      </div>
    </form>
  );
}
