import { NavLink, useParams } from "react-router-dom"
import Loader from "../../components/Loader";
import { useGetChaptersQuery } from "../../store/services/bible"
import { Chapter } from "../../types";

export default function BibleBook() {
    const { bookId } = useParams()
    const { data: chapters, isFetching, error } = useGetChaptersQuery(bookId)
    console.log({ chapters });

    if (isFetching) return <Loader />
    if (error) return <h2>Error occurred</h2>
    return (
        <div className="bibleBook">
            <div className="sidebar">

                <nav>
                    <ul>
                        {chapters.data.length && chapters.data.map((chap: Chapter) => (
                            <li key={chap.id}>
                                <NavLink to={`/chapters/${chap.id}`} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                                    {chap.reference ? chap.reference : '-'}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}