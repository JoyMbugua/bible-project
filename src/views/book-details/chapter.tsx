import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import Loader from '../../components/loader/Loader';
import PreviousNext from '../../components/previous-next';
import { colors } from '../../data/colors';
import { selectCurrentLangauge } from '../../store/features/language';
import { useGetChapterContentQuery, useGetChaptersQuery } from '../../store/services/bible';
import { Chapter as ChapterType } from '../../types';

interface Highlight {
    text: string,
    id: number | string
}

function ChapterVerse({ verse, index, chapterId, setStatus, setMessage }) {
    const { bookId: book = '' } = useParams()
    const [isHighlighted, setIsHighlighted] = useState(false)
    const [highlightedVerse, setHighlightedVerse] = useState<Highlight>({ text: '', id: '' })
    const [bgColor, setBgColor] = useState('')
    const [actualColor, setActualColor] = useState('#fff')

    useEffect(() => {
        const verseId = `${index + 1}`
        const data = JSON.parse(localStorage.getItem(book) || '{}')
        const existingChapter = data[chapterId] // {5: 'khaki', 6: 'green'}}
        const colorValue = existingChapter && existingChapter[verseId]
        setActualColor(colorValue)
        if (colorValue === bgColor) return
        const newValue = { ...existingChapter, [verseId]: bgColor }
        if (Boolean(bgColor)) {
            localStorage.setItem(book, JSON.stringify({ ...data, [chapterId]: newValue }))
        }
    }, [bgColor])


    const handleSelection = () => {
        const selection = window.getSelection() || ''
        if (selection.toString().length > 0) {
            setIsHighlighted(true)
            let selectedText = selection.toString();
            setHighlightedVerse({
                text: selectedText,
                id: index
            })
        } else {
            setIsHighlighted(false)
        }
    }

    return (
        <>
            <div className='normal-verse' onClick={handleSelection}>
                <div id={`${chapterId}:${verse.id + 1}`} className='verse-content' style={{ backgroundColor: actualColor }}>
                    <sup className='verseNo'>{index + 1}</sup>
                    {verse}
                </div>
                {isHighlighted && highlightedVerse.id === index && (
                    <ActionsModal
                        verse={highlightedVerse}
                        book={chapterId.replace('.', ' ')}
                        setStatus={setStatus}
                        setMessage={setMessage}
                        setColor={setBgColor}
                        setIsHighlighted={setIsHighlighted}
                    />
                )}
            </div>

            <br />
        </>
    )
}
export default function Chapter() {
    const { bookId = '', chapterId = '' } = useParams()
    const navigate = useNavigate()

    const bibleId = useSelector(selectCurrentLangauge)
    const { data, isFetching, error } = useGetChaptersQuery({ bibleId, bookId })

    const [status, setStatus] = useState('')
    const [message, setMessage] = useState(null)

    // fetch the chapter id
    const bookChapters = data.data.slice(1).map((item: ChapterType) => item.id);
    const actualChapterId = bookChapters[Number(chapterId) - 1]

    // use chapter id to fetch details
    const { data: chapter, isFetching: isFetchingChapter, error: chapterError } = useGetChapterContentQuery({ bibleId, chapterId: actualChapterId });

    if (isFetchingChapter) return <Loader />

    if (chapterError) return <h2>Could not fetch chapter contents. Error occurred</h2>

    const chapterData = chapter.data.content.replace(/(<([^>]+)>)/ig, '').split(/(?:\.\s*|\.[^\d\s]*)?\d+(?=[a-zA-Z'"“])/g).filter(Boolean).filter((str: string) => str.trim() !== "")
    const intro = chapterData[0]

    // pagination
    const handleNext = (): void => {
        navigate(`/${bookId}/${Number(chapterId) + 1}`)
    }
    const handlePrevious = (): void => {
        navigate(`/${bookId}/${Number(chapterId) - 1}`)
    }

    return (
        <div className="chapter">
            {status === 'success' && <Alert message={message} status={status} />}
            {/* <h3>{intro}</h3> */}
            <div className="navigate">
                <PreviousNext handleNext={handleNext} handlePrevious={handlePrevious} currentItem={Number(chapterId)} data={bookChapters} />
            </div>
            <article>
                {/* chapterData.slice(1) */}
                {
                    chapterData.map((par: string, i: number) => (
                        <ChapterVerse verse={par} key={i} index={i} setMessage={setMessage} setStatus={setStatus} chapterId={actualChapterId} />
                    ))

                }
            </article>
            <div className="navigate">
                <PreviousNext handleNext={handleNext} handlePrevious={handlePrevious} currentItem={Number(chapterId)} data={bookChapters} />
            </div>
        </div >
    )
}

function ActionsModal({ verse, book, setStatus, setMessage, setColor, setIsHighlighted }) {
    const [showHighligher, setShowHighlighter] = useState('none')
    const [copied, setCopied] = useState(false)
    const copyVerse = async () => {
        try {
            await navigator.clipboard.writeText(`${verse.text}\n ~ ${book}:${verse.id + 1}`)
            setStatus('success')
            setCopied(true)
            toast.success('verse copied to clipboard!', {
                style: {
                    color: 'black',
                    backgroundColor: 'palegreen'
                },
                iconTheme: {
                    primary: 'white',
                    secondary: 'palegreen',
                },
            })
            setIsHighlighted(false)
        } catch (err) {
            setStatus('failed')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
        }, 2500)
    }, [])

    const handleHighlighter = () => {
        setShowHighlighter('flex')
        setIsHighlighted(false);
    }

    return (
        <div className='verse-actions'>
            <div className="actions">
                <button className='copier' onClick={handleHighlighter}>highlight</button>
                <button className='copier' onClick={copyVerse}>{copied ? 'copied' : 'copy'}</button>
            </div>
            <div className="highlighter" style={{ display: showHighligher }}>
                {colors.map((color) => (
                    <button
                        key={color}
                        className='highlight'
                        style={{ backgroundColor: color }}
                        onClick={() => {
                            setColor(color)
                            setShowHighlighter('none')
                        }}
                    />
                ))}
            </div>
        </div>
    )
}