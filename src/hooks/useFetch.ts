import { useEffect, useState } from 'react'

function useFetch<T>(request: RequestInfo, init?: RequestInit) {
    const [response, setResponse] = useState<null | T>(null);
    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        setIsLoading(true);

        (async () => {
            try {
                const response = await fetch(request, {
                    ...init,
                    signal: abortController.signal,
                });

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                setResponse(await response.json());
                setIsLoading(false);
            } catch (error) {
                if (isAbortError(error)) {
                    return;
                }
                setError(error as any);
                setIsLoading(false);
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [init, request]);

    return { response, error, isLoading };
}

// type guards
function isAbortError(error: any): error is DOMException {
    if (error && error.name === "AbortError") {
        return true;
    }
    return false;
}

export default useFetch;
