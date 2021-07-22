import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import requests, { IMAGE_BASE_URL } from '../../requests'
import Button from '../Button/Button'

const Banner = () => {
    const [movie, setMovie] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
        setShow(true);
    }, [])

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url('${IMAGE_BASE_URL}${movie?.backdrop_path}')`,
                backgroundPosition: 'center center',
            }}
        >
            <div className={`${show ? 'banner__contents' : 'hidden'}`}>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <Button title='Play' />
                    <Button title='My List' />
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
