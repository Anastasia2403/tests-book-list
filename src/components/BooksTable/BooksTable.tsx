import React, { useEffect, useState } from 'react';
import { Book } from '../../types/Book';

interface Props {
  filteredBooks: Book[];
  onEdit: (bookId: number) => void;
  onStatusChange: (bookId: number) => void;
  onDelete: (bookId: number) => void;
  error: string;
}

export const BooksTable: React.FC<Props> = React.memo(
	({ filteredBooks, onEdit, onStatusChange, onDelete, error }) => {
		const [successMessage, setSuccessMessage] = useState('');

		const handleEditClick = (bookId: number) => {
			onEdit(bookId);
		};

		const handleStatusChange = (bookId: number) => {
			onStatusChange(bookId);
		};

		const handleDeleteClick = (bookId: number) => {
			onDelete(bookId);
			setSuccessMessage('Book deleted successfully.');
		};

		useEffect(() => {
			let timer: NodeJS.Timeout;

			if (successMessage) {
				timer = setTimeout(() => {
					setSuccessMessage('');
				}, 3000);
			}

			return () => {
				clearTimeout(timer);
			};
		}, [successMessage]);

		return (
			<div className="block">
				{error && <div className="notification is-danger">{error}</div>}
				{successMessage && (
					<div className="notification is-success">{successMessage}</div>
				)}
				{!error && (
					<div className="box table-container">
						<table className="table is-striped is-fullwidth">
							<thead>
								<tr>
									<th>Book title</th>
									<th>Author name</th>
									<th>Category</th>
									<th>ISBN</th>
									<th>Created At</th>
									<th>Modified/Edited At</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredBooks.map((book) => (
									<tr
										key={book.id}
										style={
											book.active
												? {}
												: {
													backgroundColor: '#f8d7da',
													textDecoration: 'line-through',
												}
										}
									>
										<td>{book.bookTitle}</td>
										<td>{book.authorName}</td>
										<td>{book.category}</td>
										<td>{book.isbn}</td>
										<td>{book.createdAt}</td>
										<td>
											{book.modifiedEditedAt !== ''
												? book.modifiedEditedAt
												: '--'}
										</td>
										<td>
											<button
												className="button is-primary"
												onClick={() => handleEditClick(book.id)}
											>
                        Edit
											</button>
											<button
												className="button is-danger"
												disabled={book.active}
												onClick={() => handleDeleteClick(book.id)}
											>
                        Delete
											</button>
											<button
												className="button is-warning"
												onClick={() => handleStatusChange(book.id)}
											>
												{book.active ? 'Deactivate' : 'Re-Activate'}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
);
