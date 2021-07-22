import React from 'react'
import './Button.css'

const Button = ({ title }) => {
    return (
        <button className="modal__button">{title}</button>
    )
}

export default Button
