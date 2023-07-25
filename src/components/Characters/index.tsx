import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
}

const Characters = () => {
  const { ref, inView } = useInView();
  const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ['characters'],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      );
      return data;
    },
    {
      getPreviousPageParam: (firstPage) =>
        firstPage.info.prev?.split('=')[1] ?? undefined,
      getNextPageParam: (lastPage) =>
        lastPage.info.next?.split('=')[1] ?? undefined
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      {data?.pages.map((page) =>
        page.results.map(
          (character: Character, i: number, arr: Character[]) => (
            <div key={character.id} ref={i === arr.length - 1 ? ref : null}>
              {character.name}
            </div>
          )
        )
      )}
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default Characters;
