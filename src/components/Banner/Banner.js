import React from 'react'
import './Banner.css'

const Banner = () => {
    return (
        <header
            className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url('https://i.imgur.com/e1hLQ2m.png')`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="banner__contents">
                <h1 className='banner__title'>Movie Name</h1>
                <div className="banner__buttons">
                    <button className="banner__buttons">Play</button>
                    <button className="banner__buttons">My List</button>
                </div>
                <h1 className="banner__description">Test description</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
