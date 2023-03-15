import React from 'react';

import styles from './styles.module.scss';

const Pagination: React.FC<{
	charactersPerPage: number;
	totalCharacters: number;
	paginate: (number: number) => void;
	currentPage: number;
}> = ({ charactersPerPage, totalCharacters, paginate, currentPage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			{pageNumbers.length > 1 && (
				<nav className={styles.pagination}>
					<ul>
						{pageNumbers.map(number => (
							<li
								key={number}
								onClick={() => paginate(number)}
								className={currentPage === number ? styles.active : ''}
							>
								{number}
							</li>
						))}
					</ul>
				</nav>
			)}
		</>
	);
};

export default Pagination;
