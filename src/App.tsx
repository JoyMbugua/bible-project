import { useEffect, useState } from 'react'
import { useGetDailyVerseQuery } from './store/services/bible'
import './App.scss';
import BooksList from './components/BookList';
import Loader from './components/Loader';
import { fetchCovers } from './store/features/covers';
import { useAppDispatch } from './store/hooks';

function App() {
    const { data: dailyVerse, isFetching, error } = useGetDailyVerseQuery()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCovers())
    }, [])

    return (
        <div className='body'>
            <header>
                <div>
                    <h1>the gospel project</h1>
                    {isFetching && <Loader />}
                    <div className="verse">
                        <p>{dailyVerse?.data.passages[0].content.replace(/(<([^>]+)>)/ig, '')}</p>
                        <p>{dailyVerse?.data.passages[0].reference}</p>
                    </div>
                </div>
            </header>
            <article>

                <BooksList />
            </article>
            <footer>Made with love by WM</footer>
        </div>
    )
}

export default App