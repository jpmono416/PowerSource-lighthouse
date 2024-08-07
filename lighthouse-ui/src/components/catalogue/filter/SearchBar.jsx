import classNames from "classnames";
import { CiSearch } from "react-icons/ci";
export default function SearchBar({
  refreshResults,
  isDisabled,
  updateQueryValueFor,
  defaultValue,
}) {
  const handleChange = (e) => {
    if (isDisabled) return;
    updateQueryValueFor("name", e.target.value);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    refreshResults();
  };

  return (
    <form className="relative" onSubmit={handleSearch}>
      <input
        role="searchbox"
        className="w-full p-2"
        type="text"
        placeholder="Search models"
        onChange={handleChange}
        disabled={isDisabled}
        defaultValue={defaultValue}
      />
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
        <button
          onClick={handleSearch}
          aria-label="search"
          role="button"
          title="Search"
          type="submit"
          disabled={isDisabled}
        >
          <CiSearch
            className={classNames("text-3xl fill-secondary-800", {
              "cursor-pointer hover:fill-green-700": !isDisabled,
              "opacity-50 cursor-default": isDisabled,
            })}
          />
        </button>
      </div>
    </form>
  );
}
