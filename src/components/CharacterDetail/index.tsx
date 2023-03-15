import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterType } from 'types/character';

import styles from './styles.module.scss';
import arrowBack from 'assets/images/icons/arrow-back.svg';

const CharacterDetail: React.FC<{ character: CharacterType }> = ({
	character,
}) => {
	// console.log('CharacterDetail component render');
	const navigate = useNavigate();

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<div className={styles.detail}>
			<div className={styles.goBack} onClick={goBackHandler}>
				<img src={arrowBack} alt='Go back' />
				GO BACK
			</div>
			<div className={styles.image}>
				<img src={character.image} alt={character.name} />
			</div>
			<h1 className={styles.name}>{character.name}</h1>
			<div className={styles.info}>
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
