import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterBar } from '../FilterBar/FilterBar';
import { BooksTable } from '../BooksTable/BooksTable';
import { Book } from '../../types/Book';
import { Footer } from '../Footer/Footer';
import { fetchBooks, deleteBook, updateBook } from '../../api/books';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
	const [books, setBooks] = useState<Book[] | []>([]);
	const [filter, setFilter] = useState('active');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	const filteredBooks = useMemo(() => {
		if (filter === 'all') {
			return books;
		} else if (filter === 'active') {
			return books.filter((book) => book.active);
		} else {
			return books.filter((book) => !book.active);
		}
	}, [books, filter]);

	const fetchData = useCallback(async () => {
		try {
			setError('');
			const booksData = await fetchBooks();
			setBooks(booksData);
		} catch {
			setError('Unable to load books list');
		}
	}, []);

	const handleFilterChange = useCallback((value: string) => {
		setFilter(value);
	}, []);

	const handleDelete = useCallback(async (bookId: number) => {
		try {
			setError('');
			await deleteBook(bookId);

			setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
		} catch {
			setError('Unable to delete');
		}
	}, []);

	const handleStatusChange = useCallback(async (bookId: number) => {
		try {
			setError('');
			const deactivatedBook = books.find((book) => book.id === bookId);

			if (deactivatedBook) {
				await updateBook(deactivatedBook.id, {
					...deactivatedBook,
					active: !deactivatedBook.active,
				});

				setBooks((prevBooks) =>
					prevBooks.map((book) => {
						if (book.id === bookId) {
							return {
								...book,
								active: !book.active,
							};
						}

						return book;
					})
				);
			}
		} catch {
			setError('Unable to update a book');
		}
	}, [books]);

	const handleEdit = useCallback((bookId: number) => {
		navigate(`/edit/${bookId}`, { state: { bookId } });
	}, [navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="container">
			<h1 className="title">Dashboard</h1>
			<div className="field is-grouped">
				<FilterBar value={filter} onFilterChange={handleFilterChange} />
				<Link to="/add" className="button is-primary">
          Add a Book
				</Link>
			</div>

			<p>
        Showing {filteredBooks.length} of {books.length}
			</p>

			<BooksTable
				filteredBooks={filteredBooks}
				onEdit={handleEdit}
				onStatusChange={handleStatusChange}
				onDelete={handleDelete}
				error={error}
			/>
			<Footer />
		</div>
	);
};
