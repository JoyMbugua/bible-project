import { createContext, useEffect, useState } from 'react';

export const BookContext = createContext('Gikuyu');

export default function BookProvider({ children }) {
    const [lang, setLang] = useState('Gikuyu');
    useEffect(() => {
        const book = localStorage.getItem('book');
        if (book) setLang(book)
    }, [])

    return (
        <BookContext.Provider value={lang}>{children}</BookContext.Provider>
    );
}
