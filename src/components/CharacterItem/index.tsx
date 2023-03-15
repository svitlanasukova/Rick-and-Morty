import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterType } from 'types/character';

import styles from './styles.module.scss';

const CharacterItem: React.FC<{ character: CharacterType }> = React.memo(
	({ character }) => {
		// console.log('CharacterItem component render');
		const navigate = useNavigate();
		const clickHandler = () => {
			navigate('/Rick-and-Morty/' + character.id);
		};
		return (
			<div className={styles.character} onClick={clickHandler}>
				<div className={styles.image}>
					<img src={character.image} alt={character.name} />
				</div>
				<div className={styles.content}>
					<h2 className={styles.name}>{character.name}</h2>
					<div className={styles.gender}>{character.gender}</div>
				</div>
			</div>
		);
	},
);

export default CharacterItem;
