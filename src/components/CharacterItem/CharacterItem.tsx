import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterType } from '../../models/character.type';

import classes from './CharacterItem.module.css';

const CharacterItem: React.FC<{ character: CharacterType }> = React.memo(
	({ character }) => {
		// console.log('CharacterItem component render');
		const navigate = useNavigate();
		const clickHandler = () => {
			navigate('/' + character.id);
		};
		return (
			<div className={classes['character-item']} onClick={clickHandler}>
				<div className={classes['character-item__image']}>
					<img src={character.image} alt={character.name} />
				</div>
				<div className={classes['character-item__content']}>
					<h2 className={classes['character-item__name']}>{character.name}</h2>
					<div className={classes['character-item__gender']}>
						{character.gender}
					</div>
				</div>
			</div>
		);
	},
);

export default CharacterItem;
