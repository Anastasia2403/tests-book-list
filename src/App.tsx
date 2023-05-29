import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AddEditBookPage } from './components/AddEditBook/AddEditBook';

export const App: React.FC = () => {
	return (
		<div data-cy="app">
			<main className='section'>
				<div className='container'>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/add" element={<AddEditBookPage />} />
						<Route path="/edit/:id" element={<AddEditBookPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
};
