import {useRouteError} from "react-router-dom";

interface ErrType {
    statusText: string
    message: string
}

declare module 'react-router-dom' {
    function useRouteError (): ErrType
}

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {typeof error === 'object' && error !== null && (
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            )}
        </>
    );
}
