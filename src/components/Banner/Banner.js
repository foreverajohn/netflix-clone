import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import requests, { IMAGE_BASE_URL } from '../../requests'
import Button from '../Button/Button'

const Banner = ({ fetchUrl }) => {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
        setLoading(false);
    }, [fetchUrl])

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
            <div className={`${loading ? 'hidden' : 'banner__contents'}`}>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <Button title='Play' />
                    <Button title='+ My List' movie={movie} />
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
