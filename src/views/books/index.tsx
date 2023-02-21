import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FixedSizeList } from "react-window";
import Loader from "../../components/Loader";
import { selectCurrentLangauge } from "../../store/features/language";
import { useGetChaptersQuery } from "../../store/services/bible";
import './index.scss';


export default function BibleBook() {
    const { bookId } = useParams()
    const bibleId = useSelector(selectCurrentLangauge)
    const { data, isFetching, error } = useGetChaptersQuery({ bookId, bibleId })

    if (isFetching) return <Loader />
    if (error) return <h2>Error occurred</h2>
    const chapters = data.data.slice(1)

    return (
        <div className="bibleBook">
            <div id="sidebar">

                <nav>
                    <FixedSizeList style={{ margin: '20px', padding: '10px' }} height={500} width={`auto`} itemCount={chapters.length} itemSize={35} >
                        {({ index, style }) => {
                            const chap = chapters[index]
                            return (
                                <div style={style}>
                                    <NavLink
                                        key={chap.id}
                                        to={`/${bookId}/${chap.number}`}
                                        state={{ chapterId: chap.id }}
                                        className={({ isPending, isActive }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                                        {chap.reference}
                                    </NavLink>
                                </div>
                            )
                        }}
                    </FixedSizeList>
                </nav>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}