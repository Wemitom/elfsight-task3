import { classNames } from 'utils';

import { ICharacter } from '..';

const CharacterModal = ({ character }: { character: ICharacter }) => {
  const getEmoji = (string: string) => {
    switch (string) {
      case 'Alive':
        return '👍';
      case 'Dead':
        return '💀';
      case 'Female':
        return '♀';
      case 'Male':
        return '♂';
      case 'Human':
      case 'Humanoid':
        return '🧑';
      case 'Alien':
        return '👽';
      case 'Robot':
        return '🤖';
      default:
        return '❓';
    }
  };

  return (
    <>
      <img className="w-full rounded-md" src={character.image} />
      <div className="px-4 py-6 text-xl text-white">
        <h1 className="mb-3 max-w-xs text-3xl font-extrabold">
          {character.name}
        </h1>

        <div className="flex flex-col gap-1 whitespace-pre-line">
          <span>
            Gender: {character.gender}{' '}
            <span
              className={classNames(
                'font-mono',
                character.gender === 'Female'
                  ? 'text-pink-600'
                  : character.gender === 'Male'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              )}
            >
              {getEmoji(character.gender)}
            </span>
          </span>
          <span>
            Status: {character.status} {getEmoji(character.status)}
          </span>
          <span>
            Species: {character.species} {getEmoji(character.species)}
          </span>
          <span>Type: {character.type || '-'}</span>
          <span>Origin: {character.origin.name}</span>
          <span>Location: {character.location.name}</span>
          <span>Episodes: {character.episode.length}</span>
        </div>
      </div>
    </>
  );
};

export default CharacterModal;
