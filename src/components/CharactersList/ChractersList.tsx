import React from 'react';
import CharacterItem from '../CharacterItem/CharacterItem';
import { CharacterType } from '../../models/character.type';

import classes from './CharactersList.module.css';

const ChractersList: React.FC<{ characters: CharacterType[] }> = React.memo(
	({ characters }) => {
		console.log('ChractersList component render');
		return (
			<div className={classes['characters-list']}>
				{characters.map(character => (
					<CharacterItem character={character} key={character.id} />
				))}
			</div>
		);
	},
);

export default ChractersList;
