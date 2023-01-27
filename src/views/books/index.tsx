import { NavLink, useParams } from "react-router-dom"
import Loader from "../../components/Loader";
import { useGetChaptersQuery } from "../../store/services/bible"
import { Chapter } from "../../types";
import { FixedSizeList } from "react-window";

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
                    <FixedSizeList height={600} width={200} itemCount={chapters.data.length} itemSize={35} >
                        {({ index, style }) => {
                            const chap = chapters.data[index]
                            return (
                                <div style={style}>
                                    <NavLink
                                        key={chap.id}
                                        to={`/chapters/${chap.number}`}
                                        className={({ isPending, isActive }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                                        {chap.reference}
                                    </NavLink>
                                </div>
                            )
                        }}
                    </FixedSizeList>
                </nav>
            </div>
        </div>
    )
}