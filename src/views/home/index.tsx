import SwitchLang from "../../components/switch-lang";
import BooksList from "./BookList";
import DailyVerse from "./daily-verse";

export default function HomePage() {
    return (
        <article>
            <DailyVerse />
            <SwitchLang />
            <BooksList />
        </article>
    );
}
