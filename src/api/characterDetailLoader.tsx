import { json, LoaderFunction } from 'react-router-dom';

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
