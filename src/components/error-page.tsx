import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Oops!</h1>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return (
            <div style={{ margin: '0 auto'}}>
                <h2>Oops!</h2>
                <p>Something is wrong. Please try again later :)</p>
            </div>
        )
    }
}