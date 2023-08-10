import React, { useEffect } from 'react'

import './Modal.css'

interface ModalProps {
  message: string
  onClick?: () => void
}

const Modal = ({ message, onClick }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__inner">
        <h2 className="modal__title">{message}</h2>
        <button className="modal__btn" onClick={onClick}>
          сыграть еще
        </button>
      </div>
    </div>
  )
}

export default Modal
