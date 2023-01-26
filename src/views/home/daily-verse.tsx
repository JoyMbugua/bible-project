import Loader from '../../components/Loader'
import { useGetDailyVerseQuery } from '../../store/services/bible'
import Flower from '../../assets/floral.png'


export default function DailyVerse() {
    const { data: dailyVerse, isFetching, error } = useGetDailyVerseQuery()
    return (
        <>
            {isFetching && <Loader />}
            <div className="verse">
                <img alt="" src={Flower} width="64" height="64" />
                <p>{dailyVerse?.data.passages[0].content.replace(/(<([^>]+)>)/ig, '')}</p>
                <p>{dailyVerse?.data.passages[0].reference}</p>
            </div>
        </>

    )
}
