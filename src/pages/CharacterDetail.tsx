import React from 'react';
import { json, LoaderFunction, useLoaderData } from 'react-router-dom';
import CharacterDetail from '../components/CharacterDetail/CharacterDetail';

import { CharacterType } from '../models/character.type';

const CharacterDetailPage = () => {
	console.log('CharacterDetailPage render');
	const character = useLoaderData() as CharacterType;
	return <CharacterDetail character={character} />;
};

export default CharacterDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
	const response = await fetch(
		'https://rickandmortyapi.com/api/character/' + params.characterId,
	);

	if (!response.ok) {
		throw json({ message: 'Could not fetch character.' }, { status: 500 });
	} else {
		return response;
	}
};
