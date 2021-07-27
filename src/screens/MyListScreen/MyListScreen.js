import React, { useEffect, useState } from 'react'
import './MyListScreen.css'
import Nav from '../../components/Nav/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromMovieList, selectUser } from '../../features/userSlice'
import db from '../../firebase'
import Grid from '../../components/Grid/Grid'
import Thumbnail from '../../components/Thumbnail/Thumbnail'

const MyListScreen = () => {
    const user = useSelector(selectUser)
    const [myList, setMyList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const list = []
        db.collection('customers')
            .doc(user.uid)
            .collection('movie_list')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    list.push(doc.data().movie)
                })
                setMyList(list)
            })
    }, [user.uid, myList])

    const removeMovie = (movieId) => {
        db.collection('customers')
                .doc(user.uid)
                .collection('movie_list')
                .where('id', '==', movieId)
                .get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete()
                })
            dispatch(deleteFromMovieList(movieId))
    }

    return (
        <div className='myListScreen'>
            <Nav />
            <div className="myListScreen__body">
                <Grid title="My List">
                    {myList.map(movie => (
                        <Thumbnail key={movie.id} movie={movie} callback={() => removeMovie(movie.id)} />
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default MyListScreen
