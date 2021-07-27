import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, updateMovieList } from '../../features/userSlice'
import db from '../../firebase'
import './Button.css'

const Button = ({ title, movie }) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const addToList = (movie) => {
        if (!user.movieList.includes(movie.id))  {
            db.collection('customers')
            .doc(user.uid)
            .collection('movie_list')
            .add({
                id: movie.id,
                movie
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        dispatch(updateMovieList(movie.id))
        } else {
            console.log('Movie is already on list')
        }
    }

    return (
        <button className="modal__button" onClick={() => addToList(movie)}>{title}</button>
    )
}

export default Button
