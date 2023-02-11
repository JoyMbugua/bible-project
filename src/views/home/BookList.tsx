import { Cloudinary } from "@cloudinary/url-gen";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
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
    const [currentPage, setCurrentPage] = useState(1)

    const { isFetching: isFetchingBooks, error: booksError } = result


    if (booksError) return <p>Ooopsie...something went wrong</p>;
    if (isFetchingBooks) return <Loader />

    const setPageItems = (data: BibleBook[]) => {
        if (currentPage === 1) {
            return data.slice(0, currentPage * itemsPerpage)
        } else {
            return data.slice(currentPage * itemsPerpage, currentPage * itemsPerpage + itemsPerpage)
        }
    }

    const numOfPages = Math.ceil(booksData.data.length / itemsPerpage)
    console.log(numOfPages);


    return (

        <main>
            <section className="book-list">
                {setPageItems(booksData.data).map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </section>
            <section className="pagination">
                <div>
                    <IconArrowLeft />
                </div>
                {new Array(numOfPages).fill(null).map((item, i) => (
                    <div onClick={() => { setCurrentPage(i + 1) }}>{i + 1}</div>
                ))}
                <div>
                    <IconArrowRight />
                </div>

            </section>
        </main>
    );
}