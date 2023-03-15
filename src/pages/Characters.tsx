import React, { useCallback, useState } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import ChractersList from '../components/CharactersList/ChractersList';
import Filter from '../components/Filter/Filter';
import { CharacterType } from '../models/character.type';

import logo from '../logo.png';

const CharactersPage = React.memo(() => {
	console.log('CharactersPage render');
	const fetchedCharacters = useLoaderData() as CharacterType[];

	let initialCharacters = fetchedCharacters;

	const filteredText = localStorage.getItem('filteredText');
	const filterCharacters = useCallback(
		(text: string, characters: CharacterType[]) =>
			characters?.filter(character => {
				const name = character.name.toLowerCase();
				return name.includes(text.toLowerCase());
			}),
		[],
	);

	if (filteredText) {
		const filteredCharacters = filterCharacters(
			filteredText,
			fetchedCharacters,
		);
		if (
			filteredCharacters &&
			filteredCharacters?.length > 0 &&
			filteredText !== ''
		) {
			initialCharacters = filteredCharacters;
		} else if (filteredText !== '' && filteredCharacters?.length === 0) {
			initialCharacters = [];
		}
	}

	const [characters, setCharacters] =
		useState<CharacterType[]>(initialCharacters);

	const filterHandler = useCallback(
		(text: string) => {
			const filteredCharacters = filterCharacters(text, characters);

			if (filteredCharacters && filteredCharacters?.length > 0 && text !== '') {
				if (text.length > 1) {
					setCharacters(filteredCharacters);
				}
			} else if (text !== '' && filteredCharacters?.length === 0) {
				setCharacters([]);
			} else {
				setCharacters(fetchedCharacters);
			}
		},
		[characters, fetchedCharacters, filterCharacters],
	);

	return (
		<div className='characters'>
			<img src={logo} alt='Logo' className='logo' />
			<Filter onFilter={filterHandler} />
			{characters.length ? (
				<ChractersList characters={characters} />
			) : (
				<p>Nothing found.</p>
			)}
		</div>
	);
});

export default CharactersPage;

export const loader = async () => {
	const response = await fetch('https://rickandmortyapi.com/api/character');

	if (!response.ok) {
		throw json({ message: 'Could not fetch characters.' }, { status: 500 });
	} else {
		const resData = await response.json();
		// Sort by character name
		const sortedData = resData.results.sort(
			(a: { name: string }, b: { name: string }) => {
				let nameA = a.name.toLowerCase(),
					nameB = b.name.toLowerCase();

				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			},
		);
		return sortedData;
	}
};
