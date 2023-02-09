import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FixedSizeList } from "react-window";
import Img from '../../assets/art2.png';
import Loader from '../../components/Loader';
import { selectCovers } from '../../store/features/covers';
import { useTypedSelector } from '../../store/hooks';
import { useGetBooksQuery } from '../../store/services/bible';
import { BibleBook } from '../../types';
import './BookList.scss';
import DailyVerse from "./daily-verse";

const cloud = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUD_NAME
    }
})

const BookItem = ({ book }) => {
    const resources = useTypedSelector(selectCovers);
    return (
        <Link key={book.id} to={`/${book.id}/1`}>
            <div className="book-container">
                <div className="book" style={{ backgroundImage: `url(${resources[book.id]?.imgUrl})` }}>
                    <div className="heading">
                        <img src={Img} alt="" />
                        <div className="title">{book.name}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default function BooksList() {
    const { data: booksData, ...result } = useGetBooksQuery()
    const [page, setPage] = useState(0)
    const [itemsPerpage, setItemsPerPage] = useState(12)
    const [displayItems, setDisplayItems] = useState([])

    const { isFetching: isFetchingBooks, error: booksError } = result


    if (booksError) return <p>Ooopsie...something went wrong</p>;
    if (isFetchingBooks) return <Loader />

    const setPageItems = (data: BibleBook[]) => {
        if (page === 1) {
            return data.slice(0, page * itemsPerpage)
        } else {
            return data.slice(page * itemsPerpage, page * itemsPerpage + itemsPerpage)
        }
    }

    const numOfPages = Math.ceil(booksData?.data / itemsPerpage)

    return (

        <main className="book-list">
            {setPageItems(booksData.data).map((book) => (
                <BookItem key={book.id} book={book} />
            ))}
        </main>
    );
}