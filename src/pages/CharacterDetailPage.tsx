import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CharacterDetail from 'components/CharacterDetail';

import { CharacterType } from 'types/character';

const CharacterDetailPage = () => {
	// console.log('CharacterDetailPage render');
	const character = useLoaderData() as CharacterType;
	return <CharacterDetail character={character} />;
};

export default CharacterDetailPage;
