import React, { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import Character from './Character';

export interface ICharacter {
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
    <div className="flex flex-wrap justify-center gap-3 px-2 py-6 sm:px-12">
      {data?.pages.map((page) =>
        page.results.map(
          (character: ICharacter, i: number, arr: ICharacter[]) => (
            <React.Fragment key={character.id}>
              <Character character={character} />
              <span ref={i === arr.length - 1 ? ref : null} />
            </React.Fragment>
          )
        )
      )}
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default Characters;
