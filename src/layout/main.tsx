import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useNetwork from '../hooks/useNetwork';
import { fetchCovers } from '../store/features/covers';
import { useAppDispatch } from '../store/hooks';
import Header from './header';
import './main.scss'

export default function MainLayout() {
    const dispatch = useAppDispatch()
    const { isConnected } = useNetwork()
    console.log({ isConnected });

    useEffect(() => {
        dispatch(fetchCovers())
    }, [])

    return (
        <div className="body">
            <Header />
            <div className="details">
                <Outlet />
            </div>
            <footer>Made with &#9829; by WM</footer>
        </div>
    );
}
