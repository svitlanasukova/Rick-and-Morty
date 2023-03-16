import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharacterDetailPage from 'pages/CharacterDetailPage';
import { loader as characterLoader } from 'api/characterDetailLoader';
import CharactersPage from 'pages/CharactersPage';
import Error from 'pages/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/Rick-and-Morty',
		index: true,
		element: <CharactersPage />,
	},
	{
		path: '/Rick-and-Morty/:characterId',
		element: <CharacterDetailPage />,
		errorElement: <Error />,
		loader: characterLoader,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
