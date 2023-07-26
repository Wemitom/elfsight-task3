import { classNames } from 'utils';

import { ICharacter } from '..';

const Character = ({ character }: { character: ICharacter }) => {
  return (
    <div
      className="flex h-full min-h-[20rem] w-52 cursor-pointer flex-col justify-between rounded-md bg-[#0d0d0d] p-3 text-white transition-colors hover:bg-[#292929] sm:w-60"
      tabIndex={0}
    >
      <img src={character.image} />
      <span>
        <h1 className="mt-2 text-2xl font-extrabold">
          {character.name}{' '}
          <span
            className={classNames(
              'font-mono',
              character.gender === 'Female'
                ? 'text-pink-600'
                : character.gender === 'Male'
                ? 'text-blue-600'
                : character.gender === 'Genderless'
                ? 'text-red-600'
                : 'text-gray-600'
            )}
          >
            {character.gender === 'Female'
              ? '♀'
              : character.gender === 'Male'
              ? '♂'
              : character.gender === 'Genderless'
              ? '❌'
              : '?'}
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <div
            className={classNames(
              'rounded-full w-3 h-3',
              character.status === 'Alive'
                ? 'bg-green-500'
                : character.status === 'Dead'
                ? 'bg-red-500'
                : 'bg-gray-500'
            )}
          />
          {character.status} - {character.species}
        </div>
      </span>
    </div>
  );
};

export default Character;
