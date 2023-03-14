import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterType } from '../../models/character.type';

import classes from './CharacterDetail.module.css';
import arrowBack from './arrow-back.svg';

const CharacterDetail: React.FC<{ character: CharacterType }> = ({
	character,
}) => {
	console.log('CharacterDetail component render');
	const navigate = useNavigate();

	const goBackHandler = () => {
		navigate('/Rick-and-Morty');
	};

	return (
		<div className={classes['character-detail']}>
			<div className={classes['go-back']} onClick={goBackHandler}>
				<img src={arrowBack} alt='Go back' />
				GO BACK
			</div>
			<div className={classes['character-detail__image']}>
				<img src={character.image} alt={character.name} />
			</div>
			<h1 className={classes['character-detail__name']}>{character.name}</h1>
			<div className={classes['character-detail__info']}>
				<h2>Informations</h2>
				<ul>
					<li>
						Gender
						<span>{character.gender}</span>
					</li>
					<li>
						Status
						<span>{character.status}</span>
					</li>
					<li>
						Specie
						<span>{character.species}</span>
					</li>
					<li>
						Origin
						<span>{character.origin.name}</span>
					</li>
					<li>
						Type
						<span>{character.type ? character.type : 'Unknown'}</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CharacterDetail;
