import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchCovers } from '../store/features/covers';
import { useAppDispatch } from '../store/hooks';
import Header from './header';
import './index.scss'

export default function Layout() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCovers())
    }, [])

    return (
        <div className="body">
            <Header />
            <div className="details">
                <Outlet />
            </div>
            <footer>Made with love by WM</footer>
        </div>
    );
}
