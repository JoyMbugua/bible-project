import SwitchLang from "../../components/switch-lang";
import BooksList from "../book-list/BookList";
import DailyVerse from "../../components/daily-verse";
import useNetwork from "../../hooks/useNetwork";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function HomePage() {
    const { isConnected } = useNetwork()

    useEffect(() => {
        if (isConnected) toast.success('you are online')
    }, [isConnected])

    if (!isConnected) return (
        <div className="network">
            <p>
                No internet
            </p>
        </div>
    )

    return (
        <article>
            <DailyVerse />
            <SwitchLang />
            <BooksList />
        </article>
    );
}
