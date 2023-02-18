import { IconClipboard, IconClipboardCheck, IconCopy } from '@tabler/icons-react';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import PreviousNext from '../../components/previous-next';
import { useGetChapterContentQuery, useGetChaptersQuery } from '../../store/services/bible';
import { Chapter as ChapterType } from '../../types';

interface Highlight {
    text: string,
    id: number | string
}
export default function Chapter() {
    const { bookId, chapterId } = useParams()
    const navigate = useNavigate()
    const [isHighlighted, setIsHighlighted] = useState(false)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState(null)
    const [highlightedVerse, setHighlightedVerse] = useState<Highlight>({ text: '', id: '' })
    const { data, isFetching, error } = useGetChaptersQuery(bookId)
    const bookChapters = data.data.slice(1).map((item: ChapterType) => item.id);
    const actualChapterId = bookChapters[Number(chapterId) - 1]

    const { data: chapter, isFetching: isFetchingChapter, error: chapterError } = useGetChapterContentQuery(actualChapterId);

    if (isFetchingChapter) return <Loader />

    if (chapterError) return <h2>Could not fetch chapter contents. Error occurred</h2>

    const chapterData = chapter.data.content.replace(/(<([^>]+)>)/ig, '').split(/(?:\.\s*|\.[^\d\s]*)?\d+(?=[a-zA-Z'"“])/g).filter(Boolean).filter((str: string) => str.trim() !== "")
    const intro = chapterData[0]
    /* 
     <NavLink
                                        key={chap.id}
                                        to={`/${bookId}/${chap.number}`}
                                        state={{ chapterId: chap.id }}
                                        className={({ isPending, isActive }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                                        {chap.reference}
                                    </NavLink>
    */
    const handleNext = (): void => {
        navigate(`/${bookId}/${Number(chapterId) + 1}`)
    }
    const handlePrevious = (): void => {
        navigate(`/${bookId}/${Number(chapterId) - 1}`)
    }

    return (
        <div className="chapter">
            {status === 'success' && <Alert message={message} status={status} />}
            <h3>{intro}</h3>
            <div className="navigate">
                <PreviousNext handleNext={handleNext} handlePrevious={handlePrevious} currentItem={Number(chapterId)} data={bookChapters} />
            </div>
            <article>
                {
                    chapterData.slice(1).map((par: string, i: number) => (
                        <Fragment key={i}>
                            <div onClick={() => {
                                const selection = window.getSelection() || ''
                                if (selection.toString().length > 0) {
                                    setIsHighlighted(true)
                                    let selectedText = selection.toString();
                                    setHighlightedVerse({
                                        text: selectedText,
                                        id: i
                                    })
                                } else {
                                    setIsHighlighted(false)
                                }
                            }}>
                                <sup className='verseNo'>{i + 1}</sup>
                                {par}
                                {isHighlighted && highlightedVerse.id === i && (
                                    <ActionsModal verse={highlightedVerse} book={actualChapterId.replace('.', ' ')} setStatus={setStatus} setMessage={setMessage} />
                                )}
                            </div>

                            <br />
                        </Fragment>
                    ))

                }
            </article>
            <div className="navigate">
                <PreviousNext handleNext={handleNext} handlePrevious={handlePrevious} currentItem={Number(chapterId)} data={bookChapters} />
            </div>
        </div >
    )
}

function ActionsModal({ verse, book, setStatus, setMessage }) {
    console.log({ book })
    const copyVerse = async () => {
        try {
            await navigator.clipboard.writeText(`${verse.text}\n ~ ${book}:${verse.id + 1}`)
            setStatus('success')
            setMessage("verse copied!")
        } catch (err) {
            setStatus('failed')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }, [])

    return (
        <span className='copier' onClick={copyVerse}>
            <IconClipboard />
            copy
        </span>
    )
}