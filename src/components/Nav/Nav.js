import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    const history = useHistory()
    const [show, setShow] = useState(false);

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);
        return () => window.removeEventListener('scroll', transitionNavbar);
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <div className="navLeft">
                    <img className='nav__logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" onClick={() => history.push('/')} />
                </div>
                <div className="navCenter">
                    <div className="nav__link" onClick={() => history.push('/tv_shows')} >TV Shows</div>
                    <div className="nav__link" onClick={() => history.push('/byGenre/Action')} >Action</div>
                    <div className="nav__link" onClick={() => history.push('/byGenre/Comedy')} >Comedy</div>
                    <div className="nav__link" onClick={() => history.push('/byGenre/Romance')} >Romance</div>
                    <div className="nav__link" onClick={() => history.push('/byGenre/Documentary')} >Documentary</div>
                    <div className="nav__link" onClick={() => history.push('/my_list')} >My List</div>
                </div>
                <div className="navRight">
                    <img className='nav__avatar' src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="" onClick={() => history.push('/profile')} />
                </div>
            </div>
        </div>
    )
}

export default Nav
