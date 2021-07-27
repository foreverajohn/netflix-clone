import React, { useEffect, useState } from 'react'
import './MyListScreen.css'
import Nav from '../../components/Nav/Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import db from '../../firebase'
import Grid from '../../components/Grid/Grid'
import Thumbnail from '../../components/Thumbnail/Thumbnail'

const MyListScreen = () => {
    const user = useSelector(selectUser)
    const [myList, setMyList] = useState([])

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
    }, [user.uid])

    return (
        <div className='myListScreen'>
            <Nav />
            <div className="myListScreen__body">
                <Grid title="My List">
                    {myList.map(movie => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default MyListScreen
