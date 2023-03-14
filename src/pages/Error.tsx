import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	console.log('ErrorPage render');
	const error = useRouteError() as {
		data: { message: string };
		status: number;
	};

	let title = 'An error occured!';
	let message = 'Something went wrong!';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not found!';
		message = 'Could not find resourse or page.';
	}
	return (
		<div style={{ textAlign: 'center', padding: '3rem' }}>
			<h1>{title}</h1>
			<p>{message}</p>
		</div>
	);
};

export default ErrorPage;
