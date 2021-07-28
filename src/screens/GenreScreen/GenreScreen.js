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
import Modal from '../../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { renderMovie, selectModalState, toggleModal } from '../../features/appSlice'

const GenreScreen = () => {
    const [movies, setMovies] = useState([])
    const { genre } = useParams()
    const { state, loading } = useGenreFetch(genre)
    const isModalOpen = useSelector(selectModalState)
    const dispatch = useDispatch()

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

    const movieInfo = (movie) => {
        dispatch(toggleModal())
        dispatch(renderMovie(movie))
    }

    return (
        <div className='genreScreen'>
            <Nav />
            <div className="genreScreen__body">
                <Grid title={state?.name}>
                    {movies?.map(movie => (
                        <Thumbnail key={movie.id} movie={movie} callback={() => movieInfo(movie)} />
                    ))}
                </Grid>
            </div>
            <Modal isOpen={isModalOpen} />
        </div>
    )
}

export default GenreScreen
