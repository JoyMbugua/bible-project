import { useGetBooksQuery } from '../store/services/bible';
import './BookList.scss';
import { Cloudinary } from "@cloudinary/url-gen";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BibleBook } from '../types';
import Loader from './Loader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCovers } from '../store/features/covers';
import { RootState } from '../store';
import { useTypedSelector } from '../store/hooks';
import Img from '../assets/art2.png'

const cloud = new Cloudinary({
    cloud: {
        cloudName: process.env.REACT_APP_CLOUD_NAME
    }
})

export default function BooksList() {
    const {
        data: booksData,
        isFetching: isFetchingBooks,
        error: booksError,
    } = useGetBooksQuery()

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    const [lastItem, setLastItem] = useState(false)
    const [bookList, setBookList] = useState<BibleBook[]>([])
    const itemsPerPage = 9;
    const isLastPage = useMemo(() => (page * itemsPerPage === booksData?.length), [booksData, page])
    const resources = useTypedSelector(selectCovers);

    useEffect(() => {
        if (isLastPage) setHasMore(false)
    }, [isLastPage])

    // setup the observer
    const observer = useRef<IntersectionObserver>();
    const lastRowRef = useCallback((node: Element | null) => {
        if (isFetchingBooks) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(data => {
            if (data[0].isIntersecting && hasMore) {
                setLastItem(true)
                setTimeout(() => {
                    setPage(prev => prev + 1)
                }, 1500)
            }
        })
        if (node) observer.current.observe(node)
    }, [isFetchingBooks, hasMore])

    useEffect(() => {
        if (booksData?.data?.length) {
            const currentBooks = booksData.data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
            setBookList(prev => [...prev, ...currentBooks])
            setLastItem(false)

        }
    }, [booksData, page])


    if (booksError) return <p>Ooopsie...something went wrong</p>;

    return (
        <div className="book-list">
            {isFetchingBooks && <Loader />}
            {bookList.map((book) => {
                return (
                    <div className="book-container" key={book.id} ref={isLastPage ? null : lastRowRef}>
                        <div className="book" style={{ backgroundImage: `url(${resources[book.id]?.imgUrl})` }}>
                            <div className="heading">
                                <img src={Img} alt="" />
                                <div className="title">{book.name}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {lastItem && <Loader />}
        </div>
    );
}