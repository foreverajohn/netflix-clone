import { useEffect, useState } from "react";
import requests from "../requests";
import axios from '../axios'

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useMovieFetch = (genreId) => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (genreId, page) => {
        try {
            setError(false)
            setLoading(true)

            const response = await axios.get(requests.fetchByGenre + genreId + "&page=" + page)

            setState(prev => ({
                ...response.data,
                results:
                    page > 1 ? [...prev.results, ...response.data.results] : [...response.data.results]
            }));

        }
        catch {
            setError(true)
        }
        setLoading(false)
    }

    // Initial 
    useEffect(() => {
        fetchMovies(genreId, 1);
    }, [genreId]);

    // Load more
    useEffect(() => {
        if (!isLoadingMore) return

        fetchMovies(genreId, state.page + 1);
        setIsLoadingMore(false)

    }, [isLoadingMore, state.page, genreId])

    return { state, loading, error, setIsLoadingMore };
}