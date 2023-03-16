import React, {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import ChractersList from 'components/CharactersList';

import logo from 'assets/images/logo.png';
import searchIcon from 'assets/images/icons/search.svg';
import { sortByObjName } from 'util/sort';
import Pagination from 'components/Pagination/Index';

let firstRender: boolean = true;

const CharactersPage = React.memo(() => {
	console.log('CharactersPage render');

	const [filterParams, setFilterParams] = useSearchParams();
	const filterValueFromParams = filterParams.get('filter');
	const initialFilterValue = useMemo(
		() => (filterValueFromParams ? filterValueFromParams : ''),
		[filterValueFromParams],
	);

	const [filterValue, setFilterValue] = useState(initialFilterValue);
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [charactersPerPage] = useState(8);

	const fetchCharacters = useCallback(async () => {
		setLoading(true);
		const response = await fetch('https://rickandmortyapi.com/api/character');
		if (!response.ok) {
			if (response.status === 404) {
				setCharacters([]);
			}
		} else {
			const resData = await response.json();
			const sortedData = resData.results.sort(sortByObjName);
			setCharacters(sortedData);
		}
		setCurrentPage(1);
		setLoading(false);
	}, []);

	const fetchFilteredCharacters = useCallback(async () => {
		setLoading(true);
		const response = await fetch(
			'https://rickandmortyapi.com/api/character/?name=' + filterValue,
		);

		if (!response.ok) {
			if (response.status === 404) {
				setCharacters([]);
			}
		} else {
			const resData = await response.json();
			const sortedData = resData.results.sort(sortByObjName);
			setCharacters(sortedData);
		}
		setCurrentPage(1);
		setLoading(false);
	}, [filterValue]);

	useEffect(() => {
		if (filterValue) {
			if (firstRender) {
				fetchFilteredCharacters();
				firstRender = false;
			} else {
				const timer = setTimeout(() => {
					fetchFilteredCharacters();
				}, 500);

				return () => {
					clearTimeout(timer);
				};
			}
		} else {
			fetchCharacters();
		}
	}, [filterValue, fetchFilteredCharacters, fetchCharacters]);

	const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilterValue(value);
		if (value) {
			setFilterParams({ filter: value });
		} else {
			setFilterParams();
		}
	};

	// Get current characters
	const indexOfLastCharacter = currentPage * charactersPerPage;
	const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = characters.slice(
		indexOfFirstCharacter,
		indexOfLastCharacter,
	);

	// Change page
	const paginateHandler = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='characters'>
			<img src={logo} alt='Logo' className='logo' />
			<div className='filter'>
				<img src={searchIcon} alt='filter' />
				<input
					type='text'
					placeholder='Filter by name...'
					value={filterValue}
					onChange={filterHandler}
				/>
			</div>
			{characters.length > 0 && (
				<ChractersList characters={currentCharacters} />
			)}
			{characters.length === 0 && !firstRender && !loading ? (
				<p>Nothing found.</p>
			) : (
				''
			)}
			{loading && <p>Loading...</p>}
			<Pagination
				charactersPerPage={charactersPerPage}
				totalCharacters={characters.length}
				paginate={paginateHandler}
				currentPage={currentPage}
			/>
		</div>
	);
});

export default CharactersPage;
