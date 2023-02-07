import { Cloudinary } from "@cloudinary/url-gen";
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

export default function BooksList() {
    const { data: booksData, ...result } = useGetBooksQuery()

    const { isFetching: isFetchingBooks, error: booksError } = result
    const resources = useTypedSelector(selectCovers);

    if (booksError) return <p>Ooopsie...something went wrong</p>;

    return (
        <>
            <DailyVerse />
            <div className="book-list">
                {isFetchingBooks && <Loader />}
                {booksData && (
                    <FixedSizeList height={600} width={800} itemCount={booksData.data.length} itemSize={100} layout="horizontal" >
                        {({ index, style }) => {
                            const book = booksData.data[index];
                            return (
                                <div style={style}>
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
                                </div>
                            )
                        }}

                    </FixedSizeList>
                )}

            </div>
        </>
    );
}