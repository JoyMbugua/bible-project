import BooksList from "./BookList";
import DailyVerse from "./daily-verse";

export default function HomePage() {
    return (
        <article>
            <DailyVerse />
            <BooksList />
        </article>
    );
}
