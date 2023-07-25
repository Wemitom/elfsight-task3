import React, { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import Modal from 'components/Modal';

import Character from './Character';
import CharacterModal from './CharacterModal';

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
  const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ['characters'],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`
      );
      return data;
    },
    {
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
    return (
      <div className="mb-3 flex justify-center text-6xl font-bold text-white">
        Loading...
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center gap-3 px-2 py-6 sm:px-12">
          {data?.pages.map((page) =>
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
