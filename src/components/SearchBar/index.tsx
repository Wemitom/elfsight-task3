import useFilter from 'utils/hooks/useFilter';

const SearchBar = () => {
  const { filter, setFilter } = useFilter();

  return (
    <div className="mt-6 flex w-full justify-center">
      <input
        className="w-52 rounded-md border border-[#333] bg-[#1e1e1e] p-2 text-white sm:w-60"
        role="search"
        aria-roledescription="search"
        placeholder="Search..."
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
    </div>
  );
};

export default SearchBar;
