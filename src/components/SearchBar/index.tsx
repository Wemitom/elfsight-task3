import Filter from 'components/Filters';
import useFilter from 'utils/hooks/useFilter';

const SearchBar = () => {
  const { filter, setFilter } = useFilter();

  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center gap-6 px-6 sm:w-60 sm:px-0">
        <input
          className="w-full shrink rounded-md border border-[#333] bg-[#1e1e1e] p-2 text-white"
          role="search"
          aria-roledescription="search"
          placeholder="Search..."
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <Filter />
      </div>

      <div
        className="max-h-0 w-full overflow-hidden px-6 transition-[max-height] duration-500 sm:w-60 sm:px-0"
        id="filters"
      />
    </div>
  );
};

export default SearchBar;
