import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalMovie, toggleModal } from '../../features/appSlice'
import { selectUser } from '../../features/userSlice'
import { addToList } from '../../helpers'
import { IMAGE_BASE_URL } from '../../requests'
import Button from '../Button/Button'
import './Modal.css'

const Modal = ({ isOpen }) => {
    const dispatch = useDispatch()
    const movie = useSelector(selectModalMovie)
    const user = useSelector(selectUser)

    const handleClose = () => {
        dispatch(toggleModal())
    }

    return (
        <div className={`${isOpen ? "modal display-block" : "modal display-none"}`} onClick={() => handleClose()}>
            <div
                className="modal__content"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url('${IMAGE_BASE_URL}${movie?.backdrop_path}')`,
                    backgroundPosition: 'center center',
                }}>
                <div className="modal__content--fade" />
                <div className="modal__contentLeft">
                    <h1>{movie.name || movie.original_title}</h1>
                    <p>{movie.overview}</p>
                    <div className="modal__buttons">
                        <Button title='Play' />
                        <Button title='+ My List' callback={() => addToList(movie, user.uid)} />
                    </div>
                </div>
                <div className="modal__contentRight">
                    <div className="modal__thumbnail">
                        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.name} />
                        <div className="modal__score">
                            <h4>{movie.vote_average}</h4>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )

}

export default Modal
