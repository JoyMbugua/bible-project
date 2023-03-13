import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchCovers } from '../store/features/covers';
import { useAppDispatch } from '../store/hooks';
import Footer from './footer';
import Header from './header';
import './main.scss'

export default function MainLayout() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCovers())
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="body">
                <Header />
                <div className="details">
                    <Outlet />
                </div>
            </div>
            <section className="footer-section">
                <Footer />
            </section>
        </>
    );
}
