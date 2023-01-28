import { NavLink, useParams } from "react-router-dom"
import Loader from "../../components/Loader";
import { useGetChapterContentQuery, useGetChaptersQuery, useLazyGetChapterContentQuery } from "../../store/services/bible"
import { Chapter } from "../../types";
import { FixedSizeList } from "react-window";
import './index.scss'
import { useEffect, useState } from "react";

function ChapterContent({ id, firstBook, firstBookId }) {
    const [fetchChapter, { data: chapter, isFetching, error }] = useLazyGetChapterContentQuery()
    useEffect(() => {

        if (id === firstBookId) {
            fetchChapter(firstBookId)
        } else {
            fetchChapter(id)
        }
    }, [id, firstBook, fetchChapter, firstBookId])

    if (isFetching) return <Loader />
    if (error) return <h2>Error occurred</h2>

    console.log(chapter);

    return (
        <div>{chapter.data}</div>
    )

}

export default function BibleBook() {
    const { bookId } = useParams()
    const { data: chapters, isFetching, error } = useGetChaptersQuery(bookId)
    const [chId, setChId] = useState('')
    const [firstBook, setFirstBook] = useState(false)
    const [firstBookId, setFirstBookId] = useState('')

    const toggleChapter = (id: string) => {
        setChId(id)
    }

    useEffect(() => {

    }, [])

    if (isFetching) return <Loader />
    if (error) return <h2>Error occurred</h2>
    return (
        <div className="bibleBook">
            <div id="sidebar">

                <nav>
                    <FixedSizeList style={{ margin: '20px', padding: '10px' }} height={500} width={`auto`} itemCount={chapters.data.length} itemSize={35} >
                        {({ index, style }) => {
                            const chap = chapters.data[index]
                            if (index === 1) {
                                setFirstBook(true)
                                setFirstBookId(chap.id)
                            } else {
                                setFirstBook(false)
                            }
                            return (
                                <div style={style}>
                                    <NavLink
                                        key={chap.id}
                                        onClick={() => toggleChapter(chap.id)}
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
            <div className="content">
                <ChapterContent id={chId} firstBook={firstBook} firstBookId={firstBookId} />
            </div>
        </div>
    )
}