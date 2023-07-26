import React, { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useThrottle } from 'react-use';

import Modal from 'components/Modal';
import useFilter from 'utils/hooks/useFilter';

import Character from './Character';
import CharacterModal from './CharacterModal';

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
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
  const [openedCharacter, setOpenedCharacter] = useState<ICharacter | null>(
    null
  );

  const { ref, inView } = useInView();
  const { filter } = useFilter();
  const filterThrottled = useThrottle(filter, 200);
  const { status, data, error, isFetching, fetchNextPage, refetch } =
    useInfiniteQuery<{
      info: Info;
      results: ICharacter[];
    }>(
      ['characters'],
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${pageParam}${
            filterThrottled.name ? `&name=${filterThrottled.name}` : ''
          }${
            filterThrottled.status ? `&status=${filterThrottled.status}` : ''
          }${
            filterThrottled.species ? `&species=${filterThrottled.species}` : ''
          }${filterThrottled.type ? `&type=${filterThrottled.type}` : ''}${
            filterThrottled.gender ? `&gender=${filterThrottled.gender}` : ''
          }`
        );
        return data;
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.info.next
            ? lastPage.info.next.split('=')[1].split('&')[0]
            : undefined,
        refetchOnWindowFocus: false,
        retry: false
      }
    );

  useEffect(() => {
    refetch();
  }, [filterThrottled, refetch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === 'loading') {
    return (
      <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-8 border-t-red-600" />
        <div className="mb-3 text-4xl font-bold text-white sm:text-6xl">
          Loading...
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (error as Error).message.includes('404') ? (
      <div className="mt-6 flex justify-center text-4xl font-bold text-white">
        Nothing was found
      </div>
    ) : (
      <div className="text-white">Error: {(error as Error).message}</div>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center gap-3 px-2 py-6 sm:px-12">
          {data.pages.map((page) =>
            page.results.map(
              (character: ICharacter, i: number, arr: ICharacter[]) => (
                <div
                  key={character.id}
                  ref={i === arr.length - 1 ? ref : null}
                  onClick={() => setOpenedCharacter(character)}
                >
                  <Character character={character} />
                </div>
              )
            )
          )}
        </div>
        {isFetching && (
          <div className="mb-3 flex justify-center text-6xl font-bold text-white">
            Loading...
          </div>
        )}
      </div>

      {openedCharacter && (
        <Modal onClose={() => setOpenedCharacter(null)}>
          <CharacterModal character={openedCharacter} />
        </Modal>
      )}
    </>
  );
};

export default Characters;
