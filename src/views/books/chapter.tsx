import { IconCopy } from '@tabler/icons-react';
import { Fragment, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetChapterContentQuery, useGetChaptersQuery } from '../../store/services/bible';
import { Chapter as ChapterType } from '../../types';

interface Highlight {
    text: string,
    id: number | string
}
export default function Chapter() {
    const { bookId, chapterId } = useParams()
    const [isHighlighted, setIsHighlighted] = useState(false)
    const [highlightedVerse, setHighlightedVerse] = useState<Highlight>({ text: '', id: '' })
    const { data, isFetching, error } = useGetChaptersQuery(bookId)
    const actualChapterId = data.data.slice(1).map((item: ChapterType) => item.id)[Number(chapterId) - 1]

    const { data: chapter, isFetching: isFetchingChapter, error: chapterError } = useGetChapterContentQuery(actualChapterId)
    if (isFetchingChapter) return <Loader />
    if (chapterError) return <h2>Could not fetch chapter contents. Error occurred</h2>
    const chapterData = chapter.data.content.replace(/(<([^>]+)>)/ig, '').split(/[0-9$]/g).filter(Boolean);
    const intro = chapterData[0]

    return (
        <div className="chapter">
            <h3>{intro}</h3>
            {
                chapterData.slice(1).map((par, i: number) => (
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
                                <ActionsModal verse={highlightedVerse} />
                            )}
                        </div>

                        <br />
                    </Fragment>
                ))

            }
        </div >
    )
}

function ActionsModal({ verse }) {

    return (
        <span className='copier' onClick={() => {
            console.log(verse)
        }}>
            <IconCopy />
            copy
        </span>
    )
}