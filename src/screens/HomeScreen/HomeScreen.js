import React from 'react'
import Banner from '../../components/Banner/Banner'
import Nav from '../../components/Nav/Nav'
import './HomeScreen.css'
import requests from '../../requests'
import Row from '../../components/Row/Row'
import { selectModalState } from '../../features/appSlice'
import { useSelector } from 'react-redux'
import Modal from '../../components/Modal/Modal'

const HomeScreen = () => {
    const isModalOpen = useSelector(selectModalState)
    
    return (
        <div className='homescreen'>
            <Nav />
            <Banner />
            <Row title='Netflix Originals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
            {/* <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
            <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
            <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
            <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
            <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
            <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
            <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} /> */}
            <Modal isOpen={isModalOpen} />
        </div>
    )
}

export default HomeScreen
