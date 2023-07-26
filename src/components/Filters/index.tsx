import { useEffect, useState } from 'react';

import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

import { Filter } from 'components/App';
import useFilter from 'utils/hooks/useFilter';

type Options = 'status' | 'gender';
const optionValues: Record<Options, (string | null)[]> = {
  status: [null, 'Alive', 'Dead', 'unknown'],
  gender: [null, 'Female', 'Male', 'Genderless', 'unknown']
};

const FilterOptions = ({
  option,
  newFilter,
  handleChange
}: {
  option: Options;
  newFilter: Filter;
  handleChange: (newValue: (typeof optionValues)[Options][number]) => void;
}) => {
  const [curOption, setCurOption] = useState(
    optionValues[option].indexOf(newFilter[option]!)
  );

  useEffect(() => {
    setCurOption(optionValues[option].indexOf(newFilter[option]!));
  }, [newFilter, option]);

  return (
    <div className="flex w-8/12 justify-between gap-3">
      <ArrowLeftIcon
        className="w-4"
        onClick={() =>
          setCurOption((prev) => {
            const newOption =
              prev === 0 ? optionValues[option].length - 1 : curOption - 1;
            handleChange(optionValues[option][newOption]);

            return newOption;
          })
        }
      />
      {optionValues[option][curOption] ? optionValues[option][curOption] : '-'}
      <ArrowRightIcon
        className="w-4"
        onClick={() =>
          setCurOption((prev) => {
            const newOption =
              prev === optionValues[option].length - 1 ? 0 : curOption + 1;
            handleChange(optionValues[option][newOption]);

            return newOption;
          })
        }
      />
    </div>
  );
};

const Filters = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const { filter, setFilter } = useFilter();
  const [newFilter, setNewFilter] = useState({ ...filter });
  const filtersDiv = document.getElementById('filters');

  useEffect(() => {
    if (filtersDiv) {
      if (openFilters) filtersDiv.style.maxHeight = '500px';
      else filtersDiv.style.maxHeight = '0';
    }
  }, [filtersDiv, openFilters]);

  return (
    <div className="">
      <AdjustmentsHorizontalIcon
        className="w-8 cursor-pointer stroke-white"
        onClick={() => setOpenFilters(!openFilters)}
      />
      {filtersDiv &&
        createPortal(
          <div className="flex w-full flex-col gap-3 rounded-md border border-[#333] bg-[#0d0d0d] p-4 text-white">
            <h2 className="mb-4 text-center text-xl font-bold">Filters</h2>

            <div className="flex w-full justify-between gap-3">
              <h3>Status</h3>
              <FilterOptions
                option="status"
                newFilter={newFilter}
                handleChange={(newStatus) =>
                  setNewFilter({
                    ...newFilter,
                    status: newStatus
                  })
                }
              />
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <h3>Species</h3>

              <input
                className="w-8/12 shrink rounded-md border border-[#333] bg-[#1e1e1e] p-1 text-white"
                role="search"
                aria-roledescription="search"
                value={newFilter.species ?? ''}
                onChange={(e) =>
                  setNewFilter({ ...newFilter, species: e.target.value })
                }
              />
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <h3>Type</h3>

              <input
                className="w-8/12 shrink rounded-md border border-[#333] bg-[#1e1e1e] p-1 text-white"
                role="search"
                aria-roledescription="search"
                value={newFilter.type ?? ''}
                onChange={(e) =>
                  setNewFilter({ ...newFilter, type: e.target.value })
                }
              />
            </div>

            <div className="flex w-full justify-between gap-3">
              <h3>Gender</h3>
              <FilterOptions
                option="gender"
                newFilter={newFilter}
                handleChange={(newGender) =>
                  setNewFilter({
                    ...newFilter,
                    gender: newGender
                  })
                }
              />
            </div>

            <div className="flex w-full justify-center gap-3">
              <button
                className="grow rounded-3xl bg-[#ff0000] px-3 py-2 transition-colors hover:bg-[#cc0000]"
                onClick={() => {
                  setNewFilter({
                    name: filter.name,
                    status: null,
                    species: null,
                    type: null,
                    gender: null
                  });
                  setFilter({
                    name: filter.name,
                    status: null,
                    species: null,
                    type: null,
                    gender: null
                  });
                }}
              >
                Clear
              </button>
              <button
                className="grow rounded-3xl bg-[#00dd00] px-3 py-2 transition-colors hover:bg-[#00cc00]"
                onClick={() => setFilter({ ...newFilter, name: filter.name })}
              >
                Apply
              </button>
            </div>
          </div>,
          filtersDiv
        )}
    </div>
  );
};

export default Filters;
