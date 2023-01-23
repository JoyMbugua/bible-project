import { useGetBooksQuery } from '../store/services/bible';
import './BookList.scss';
import { Cloudinary } from "@cloudinary/url-gen";

const cloud = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUD_NAME
    }
})

function Book({ book }) {
    const testImage = cloud.image(`bible-covers/${book.id}`)

    return (
        <div className="book" style={{ backgroundImage: `url(${testImage.toURL()})` }}>
            <h3>{book.name}</h3>
        </div>
    )

}

export default function BooksList() {

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
                    <Book book={book} />
                </div>
            ))}
        </div>
    );
}