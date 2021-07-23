import React from 'react'
import './Grid.css'

const Grid = ({ title, children }) => {
    return (
        <div className='grid'>
            <h1>{title}</h1>
            <div className="grid__content">{children}</div>
        </div>
    )
}

export default Grid
