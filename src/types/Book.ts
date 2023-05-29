export interface Book {
  id: number;
  bookTitle: string;
  authorName: string;
  category: string;
  isbn: number | string;
  createdAt: string;
  modifiedEditedAt: string;
  active: boolean;
}