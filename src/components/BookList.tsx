import { useGetBooksQuery } from '../store/services/bible';
import './BookList.scss';
import { useEffect, useState } from 'react';


export default function BooksList() {
    const [covers, setVCovers] = useState();
    const {
        data: booksData,
        isFetching: isFetchingBooks,
        error: booksError,
    } = useGetBooksQuery()

    if (isFetchingBooks) return <p>Loading the books of the bible...</p>;
    if (booksError) return <p>Ooopsie...something went wrong</p>;
    console.log(booksData.data);
    return (
        <div className="book-list">
            {booksData.data.map((book) => (
                <div className="book-container" key={book.id}>
                    <div className="book">
                        <h3>{book.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}