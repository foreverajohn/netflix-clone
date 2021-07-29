import React, { useRef, useEffect, useCallback } from 'react'
import Nav from '../../components/Nav/Nav'
import './GenreScreen.css'
import { useParams } from 'react-router'
import Grid from '../../components/Grid/Grid'
import Thumbnail from '../../components/Thumbnail/Thumbnail'
import { useGenreFetch } from '../../hooks/useGenreFetch'
import Modal from '../../components/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { renderMovie, selectModalState, toggleModal } from '../../features/appSlice'
import { useMovieFetch } from '../../hooks/useMovieFetch'

const GenreScreen = () => {
    const { genre } = useParams()
    const { state, loading } = useGenreFetch(genre)
    const isModalOpen = useSelector(selectModalState)
    const dispatch = useDispatch()
    const { state: response, setIsLoadingMore } = useMovieFetch(state?.id);
    const gridInnerRef = useRef()

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

    useEffect(() => {
        if (gridInnerRef) {
            window.addEventListener('scroll', loadMore);
        }
        return () => window.removeEventListener('scroll', loadMore);
    }, []);

    const loadMore = useCallback(() => {
        if ((window.pageYOffset + window.innerHeight + 1) >= gridInnerRef.current.scrollHeight) {
            setIsLoadingMore(true)
        }
    }, [setIsLoadingMore])

    return (
        <div className='genreScreen'>
            <Nav />
            <div className="genreScreen__body" ref={gridInnerRef}>
                <Grid title={state?.name} >
                    {response.results.map(
                        (movie) =>
                            ((movie.poster_path) ||
                                (movie.backdrop_path)) && (
                                <Thumbnail key={movie.id} movie={movie} callback={() => movieInfo(movie)} clickable />
                            ))}
                </Grid>
            </div>
            <Modal isOpen={isModalOpen} />
        </div>
    )
}

export default GenreScreen
