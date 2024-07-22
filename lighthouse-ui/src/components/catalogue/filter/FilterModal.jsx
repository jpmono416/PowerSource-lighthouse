import FiltersValidator from "../../../utils/validators/FIltersValidator";
import SlidingDrawer from "../../library/SlidingDrawer";
import ReleaseDateFilter from "./ReleaseDateFilter";

import Button from "../../library/Button";
import catalogueFilterData from "../../../dummyData/catalogueFilterData";
import FilterDropdown from "./FilterDropdown";

export default function FilterModal({
  doShow,
  onClose,
  updateQueryValueFor,
  handleApplyFilters,
}) {
  const { organizations, licences, access, modalities } = catalogueFilterData;
  const validator = new FiltersValidator();

  const headingClasses = "text-xl text-secondary-50 font-light mb-2";

  return (
    <SlidingDrawer doShow={doShow} onClose={onClose}>
      <div className="mb-4 bg-secondary-700 p-4 h-full select-none overflow-y-auto">
        <h2 className="text-3xl text-primary-50 mb-4 font-light">Filters</h2>
        <div className="mb-6">
          <h3 className={headingClasses}>Release Date</h3>
          <ReleaseDateFilter
            isDisabled={!doShow}
            validator={validator}
            updateQueryValueFor={updateQueryValueFor}
          />
        </div>
        <div className="mb-4">
          <h3 className={headingClasses}>Organisation</h3>
          <FilterDropdown
            options={organizations}
            isDisabled={!doShow}
            onChange={(value) => updateQueryValueFor("organization", value)}
          />
        </div>
        <div className="mb-4">
          <h3 className={headingClasses}>Licence</h3>
          <FilterDropdown
            options={licences}
            isDisabled={!doShow}
            onChange={(value) => updateQueryValueFor("licence", value)}
          />
        </div>
        <div className="mb-4">
          <h3 className={headingClasses}>Access</h3>
          <FilterDropdown
            options={access}
            isDisabled={!doShow}
            onChange={(value) => updateQueryValueFor("access", value)}
          />
        </div>
        <div className="mb-6">
          <h3 className={headingClasses}>Modality</h3>
          <FilterDropdown
            options={modalities}
            isDisabled={!doShow}
            onChange={(value) => updateQueryValueFor("modality", value)}
          />
        </div>

        <div className="flex justify-center gap-x-2">
          <Button primary onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </SlidingDrawer>
  );
}
