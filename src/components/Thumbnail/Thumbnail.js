import React from 'react'
import { IMAGE_BASE_URL } from '../../requests'
import './Thumbnail.css'

const Thumbnail = ({ movie, callback, clickable }) => {
    return (
        <div className={`thumbnail ${clickable && 'clickable'}`} onClick={callback}>
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.name || movie.original_name} />
        </div>
    )
}

export default Thumbnail
