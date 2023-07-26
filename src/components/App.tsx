import { createContext, useState } from 'react';

import Characters from './Characters';
import SearchBar from './SearchBar';

export const FilterContext = createContext<{
  filter: Filter;
  setFilter: (filter: Filter) => void;
}>({
  filter: {
    name: '',
    status: null,
    species: null,
    type: null,
    gender: null
  },
  setFilter: () => {}
});

interface Filter {
  name: string;
  status: string | null;
  species: string | null;
  type: string | null;
  gender: string | null;
}

function App() {
  const [filter, setFilter] = useState<Filter>({
    name: '',
    status: null,
    species: null,
    type: null,
    gender: null
  });

  return (
    <main>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <SearchBar />
        <Characters />
      </FilterContext.Provider>
    </main>
  );
}

export default App;
