import { useState } from 'react'
import { useGetDailyVerseQuery } from './store/services/bible'
import './App.scss';
import BooksList from './components/BookList';

function App() {
    const { data: dailyVerse, isFetching, error } = useGetDailyVerseQuery()

    if (isFetching) return <p>fetching daily verse...</p>
    return (
        <div className='body'>
            <header>
                <div>
                    <h1>the gospel project</h1>
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