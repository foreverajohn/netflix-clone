import React, { useEffect, useState } from 'react'
import './MyListScreen.css'
import Nav from '../../components/Nav/Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import db from '../../firebase'

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

    console.log(myList)
    return (
        <div className='myListScreen'>
            <Nav />
        </div>
    )
}

export default MyListScreen
