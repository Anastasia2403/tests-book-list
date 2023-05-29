import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { createBook, getBookById, updateBook } from '../../api/books';
import { Book } from '../../types/Book';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  book?: Book;
}

export const AddEditBookPage: React.FC<Props> = () => {
	const [bookTitle, setBookTitle] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [category, setCategory] = useState('');
	const [isbn, setIsbn] = useState<number | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [createdAt, setCreatedAt] = useState('');
	const [modifiedEditedAt, setModifiedEditedAt] = useState('');
	const [message, setMessage] = useState('');
	const location = useLocation();
	const bookId = useMemo(() => location.state?.bookId, [location.state?.bookId]);
	const navigate = useNavigate();

	useEffect(() => {
		if (bookId) {
			getBook();
		}
	}, [bookId]);

	const getBook = useCallback(async () => {
		try {
			const book = await getBookById(bookId);
			if (book) {
				setBookFields(book);
			}
		} catch {
			setErrorMessage('Failed to fetch book details. Please try again.');
		}
	}, [bookId]);

	const setBookFields = useCallback((book: Book) => {
		const { bookTitle, authorName, category, isbn, createdAt } = book;
		setBookTitle(bookTitle);
		setAuthorName(authorName);
		setCategory(category);
		setIsbn(+isbn);
		setCreatedAt(createdAt);
	}, []);

	const handleSubmit = useCallback(async (event: React.FormEvent) => {
		event.preventDefault();
		if (!bookTitle.trim() || !authorName.trim() || !category.trim() || !isbn) {
			setErrorMessage('Please fill in all the fields.');
		} else {
			const newBook: Book = {
				id: bookId || generateId(),
				bookTitle,
				authorName,
				category,
				isbn,
				active: true,
				createdAt: bookId
					? createdAt
					: moment().format('D MMMM YYYY, h:mmA'),
				modifiedEditedAt: modifiedEditedAt,
			};

			try {
				if (bookId) {
					await updateBook(bookId, newBook);
					setMessage('Book updated successfully!');
					setModifiedEditedAt(moment().format('D MMMM YYYY, h:mmA'));
				} else {
					await createBook(newBook);
					setMessage('New book created!');
					setCreatedAt(moment().format('D MMMM YYYY, h:mmA'));
				}

				setTimeout(() => {
					setBookTitle('');
					setAuthorName('');
					setCategory('');
					setIsbn(0);
					setErrorMessage('');
					navigate('/');
				}, 1000);
			} catch (error) {
				setErrorMessage('Failed to update/create the book. Please try again.');
			}
		}
	}, [bookId, bookTitle, authorName, category, isbn, createdAt, modifiedEditedAt, navigate]);

	const generateId = useCallback(() => {
		return Math.floor(100000 + Math.random() * 900000);
	}, []);

	return (
		<div className="container">
			<h1 className="title">{bookId ? 'Edit book' : 'Add book'}</h1>
			{errorMessage && <p className="has-text-danger">{errorMessage}</p>}
			{message && <p className="has-text-success">{message}</p>}
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label htmlFor="bookTitle" className="label">
            Book Title:
					</label>
					<div className="control">
						<input
							className="input"
							type="text"
							id="bookTitle"
							value={bookTitle}
							onChange={(event) => setBookTitle(event.target.value)}
							placeholder="Kobzar"
							required
						/>
					</div>
				</div>

				<div className="field">
					<label htmlFor="authorName" className="label">
            Author Name:
					</label>
					<div className="control">
						<input
							className="input"
							type="text"
							id="authorName"
							value={authorName}
							placeholder="Taras Shevchenko"
							onChange={(event) => setAuthorName(event.target.value)}
							required
						/>
					</div>
				</div>

				<div className="field">
					<label htmlFor="category" className="label">
            Category:
					</label>
					<div className="control">
						<input
							className="input"
							type="text"
							id="category"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							placeholder="poem"
							required
						/>
					</div>
				</div>

				<div className="field">
					<label htmlFor="isbn" className="label">
            ISBN:
					</label>
					<div className="control">
						<input
							className="input"
							type="number"
							id="isbn"
							value={isbn !== null ? isbn : ''}
							onChange={(event) => setIsbn(+event.target.value)}
							placeholder="345627"
							required
						/>
					</div>
				</div>

				<div className="field">
					<div className="control">
						{bookId ? (
							<button className="button is-primary" type="submit">
                Edit a Book
							</button>
						) : (
							<button className="button is-primary" type="submit">
                Add a Book
							</button>
						)}
					</div>
				</div>
			</form>
			<br />
			<a href="/dashboard" className="has-text-black">
        Go to Dashboard
			</a>
		</div>
	);
};
