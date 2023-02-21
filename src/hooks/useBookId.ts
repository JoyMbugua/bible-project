import { useContext } from 'react';
import { BookContext } from '../context/books';

export default function useBookId() {
  const context = useContext(BookContext);
  if (!context) throw new Error('context not provided');
  return context
}
