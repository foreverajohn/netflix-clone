import React from 'react'
import Banner from '../../components/Banner/Banner'
import Nav from '../../components/Nav/Nav'
import Row from '../../components/Row/Row'
import requests from '../../requests'
import './TvShowsScreen.css'

const TvShowsScreen = () => {
    return (
        <div className='tvShowsScreen'>
            <Nav />
            <Banner fetchUrl={requests.fetchPopularTvShows} />
            <Row title='Netflix Originals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
            <Row title='Amazon Prime Video Originals' fetchUrl={requests.fetchAmazonOriginals} isLargeRow={true} />
            <div className="tvShowsScreen__body">

            </div>
        </div>
    )
}

export default TvShowsScreen
