import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharacterDetailPage, {
	loader as characterLoader,
} from './pages/CharacterDetail';
import CharactersPage, { loader as charactersLoader } from './pages/Characters';
import Error from './pages/Error';

const router = createBrowserRouter([
	{
		path: '/Rick-and-Morty',
		index: true,
		element: <CharactersPage />,
		errorElement: <Error />,
		loader: charactersLoader,
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
