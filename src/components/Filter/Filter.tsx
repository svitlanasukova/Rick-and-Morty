import React, { useState } from 'react';

import classes from './Filter.module.css';
import searchIcon from './search.svg';

const Filter: React.FC<{ onFilter: (text: string) => void }> = React.memo(
	({ onFilter }) => {
		console.log('Filter component render');
		const filteredText = localStorage.getItem('filteredText');
		let initial = filteredText ? filteredText : '';

		const [enteredText, setEnteredText] = useState(initial);

		const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			localStorage.setItem('filteredText', value);
			setEnteredText(value);
			onFilter(value);
		};

		return (
			<div className={classes.filter}>
				<img src={searchIcon} alt='filter' />
				<input
					type='text'
					placeholder='Filter by name...'
					value={enteredText}
					onChange={changeHandler}
				/>
			</div>
		);
	},
);

export default Filter;
