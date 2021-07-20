import React from 'react'
import Banner from '../../components/Banner/Banner'
import Nav from '../../components/Nav/Nav'
import './HomeScreen.css'

const HomeScreen = () => {
    return (
        <div className='homescreen'>
            <Nav />
            <Banner />
        </div>
    )
}

export default HomeScreen
