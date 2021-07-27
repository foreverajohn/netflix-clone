import { useEffect, useState } from "react";
import requests from "../requests";
import axios from '../axios'

export const useGenreFetch = (genre) => {
    const [state, setState] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchGenres() {
            try {
                setLoading(true);
                setError(false);

                const request = await axios.get(requests.fetchGenres);
                const result = request.data.genres.filter(item => item.name === genre)
                
                setState(
                    ...result
                )
                setLoading(false);
                return request;
            } catch {
                setError(true);
            }

        }
        fetchGenres();
    }, [genre])

    return { state, loading, error }
}