import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from '../../axios'
import { IMAGE_BASE_URL } from '../../requests'
import { useDispatch } from 'react-redux'
import { renderMovie, toggleModal } from '../../features/appSlice'


const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const movieInfo = (movie) => {
        dispatch(toggleModal())
        dispatch(renderMovie(movie))
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className={`${loading ? 'hidden' : 'row__posters'}`}>
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                onClick={() => movieInfo(movie)}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                key={movie.id}
                                src={`${IMAGE_BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        )
                )}
            </div>
        </div>
    )
}

export default Row
