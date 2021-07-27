import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import './GenreScreen.css'
import axios from '../../axios'
import requests from '../../requests'
import { useParams } from 'react-router'
import Grid from '../../components/Grid/Grid'
import Thumbnail from '../../components/Thumbnail/Thumbnail'
import { useGenreFetch } from '../../hooks/useGenreFetch'

const GenreScreen = () => {
    const [movies, setMovies] = useState([])
    const { genre } = useParams()
    const { state, loading } = useGenreFetch(genre)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchByGenre + state?.id);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [genre, state])

    if (loading) {
        <div className='genreScreen'>
            <Nav />
            <div className="genreScreen__body">
                <h1>Loading...</h1>
            </div>
        </div>
    }

    return (
        <div className='genreScreen'>
            <Nav />
            <div className="genreScreen__body">
                <Grid title={state?.name}>
                    {movies?.map(movie => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default GenreScreen
