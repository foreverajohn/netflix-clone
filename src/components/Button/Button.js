import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromMovieList, selectMovieList, selectUser, addToMovieList } from '../../features/userSlice'
import db from '../../firebase'
import './Button.css'

const Button = ({ title, movie }) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const movieList = useSelector(selectMovieList)
    const onList = movieList.includes(movie?.id)

    const addMovieToList = (movie) => {
        if (!onList) {
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
            dispatch(addToMovieList(movie.id))
        } else {
            db.collection('customers')
                .doc(user.uid)
                .collection('movie_list')
                .where('id', '==', movie.id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete()
                })
            dispatch(deleteFromMovieList(movie.id))
        }
    }

    return (
        <button className={`${onList && 'onList'}`} onClick={() => addMovieToList(movie)}>{onList ? 'On List' : title}</button>
    )
}

export default Button
