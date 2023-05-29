import moment from 'moment';
import { client } from '../utils/fetchClient';
import { Book } from '../types/Book';

export const fetchBooks = (): Promise<Book[]> => {
	return client.get<Book[]>('');
};

export const getBookById = (bookId: number): Promise<Book> => {
	return client.get(`/${bookId}`);
};

export const createBook = (book: Book): Promise<Book> => {
	const createdAt = moment().format('D MMMM YYYY, h:mmA');
	const newBook = { ...book, createdAt };

	return client.post('', newBook);
};

export const deleteBook = (id: number): Promise<unknown> => {
	return client.delete(`/${id}`);
};

export const updateBook = (id: number, book: Book): Promise<Book> => {
	const modifiedEditedAt = moment().format('D MMMM YYYY, h:mmA');
	const updatedBook = { ...book, modifiedEditedAt };

	return client.patch(`/${id}`, updatedBook);
};