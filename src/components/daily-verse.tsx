import Loader from './loader/Loader'
import { useGetDailyVerseQuery } from '../store/services/bible'
import { useSelector } from 'react-redux'
import { selectCurrentLangauge } from '../store/features/language'


export default function DailyVerse() {
    const bibleId = useSelector(selectCurrentLangauge)
    const { data: dailyVerse, isFetching, isSuccess } = useGetDailyVerseQuery(bibleId)
    return (
        <>
            {isFetching && <Loader />}
            <div className="verse">
                <p>{dailyVerse?.data.passages[0].content.replace(/(<([^>]+)>)|[0-9]/ig, '')}</p>
                {isSuccess && <p>&#x7E;{dailyVerse?.data.passages[0].reference}&#x7E;</p>}
            </div>
        </>

    )
}
