import React from 'react';
import CharacterItem from '../CharacterItem';
import { CharacterType } from 'types/character';

import styles from './styles.module.scss';

const ChractersList: React.FC<{ characters: CharacterType[] }> = React.memo(
	({ characters }) => {
		console.log('ChractersList component render');
		return (
			<div className={styles.characters}>
				{characters.map(character => (
					<CharacterItem character={character} key={character.id} />
				))}
			</div>
		);
	},
);

export default ChractersList;
