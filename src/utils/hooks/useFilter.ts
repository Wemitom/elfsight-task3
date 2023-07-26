import { useContext } from 'react';

import { FilterContext } from 'components/App';

export default function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error(`useFilter must be used within a FilterProvider`);
  }
  return context;
}
