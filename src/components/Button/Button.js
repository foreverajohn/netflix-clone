import React from 'react'
import './Button.css'

const Button = ({ title, callback }) => {
    return (
        <button className="modal__button" onClick={callback}>{title}</button>
    )
}

export default Button
