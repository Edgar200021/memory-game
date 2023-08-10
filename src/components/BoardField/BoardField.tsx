import React, { useEffect, useMemo, useState } from 'react'

import './BoardField.css'

import { Images } from '../App/App'
import { BoardFields } from '../../types'

interface BoardFieldProps {
  id: number
  image: string
  setSameImage: React.Dispatch<React.SetStateAction<Images>>
  sameImage: Images
  setBoardFields: React.Dispatch<React.SetStateAction<BoardFields[]>>
  boardFields: BoardFields[]
  remainingMoves: number
  setRemainingMoves: React.Dispatch<React.SetStateAction<number>>
}

const BoardField = ({
  id,
  image,
  setSameImage,
  sameImage,
  setBoardFields,
  boardFields,
  remainingMoves,
  setRemainingMoves,
}: BoardFieldProps) => {
  const [rotate, setRotate] = useState(false)

  function toggleRotate(): void {
    setRotate(true)
  }

  useEffect(() => {
    if (rotate) {
      setSameImage(prev => {
        if (!prev.image1) {
          return { image1: image, image2: prev.image2 }
        }
        return { image1: prev.image1, image2: image }
      })
    } else {
      setSameImage(prev => {
        if (prev.image1 === image) {
          return { image1: '', image2: prev.image2 }
        }
        return { image1: prev.image1, image2: '' }
      })
    }
  }, [rotate])

  const isSameImage: boolean =
    sameImage.image1 === sameImage.image2 && sameImage.image1 === image

  useEffect(() => {
    if (isSameImage) {
      const timeout = setTimeout(
        () =>
          setBoardFields(prev => {
            return prev.map(val => {
              if (val.id === id) {
                return { ...val, image: '' }
              }
              return val
            })
          }),
        200
      )

      timeout

      return () => clearTimeout(timeout)
    }
  }, [isSameImage])

  useEffect(() => {
    setRotate(prev => {
      if (rotate && !sameImage.image1 && !sameImage.image2) {
        return false
      }
      return prev
    })
  }, [sameImage.image1, sameImage.image2])

  const isExist: boolean =
    boardFields.find(board => board.id === id).image === ''

  return (
    <div
      className="board-field "
      style={{
        pointerEvents: isExist ? 'none' : 'auto',
        opacity: isExist ? '0' : '1',
        visibility: isExist ? 'hidden' : 'visible',
      }}
    >
      <button
        className="board-field__btn"
        onClick={toggleRotate}
        disabled={!!sameImage.image1 && !!sameImage.image2}
      ></button>
      <div className="board-field__inner">
        <div
          className="board-field__front"
          style={{ transform: rotate ? 'rotateY(180deg)' : 'rotateY(0)' }}
        >
          <span className="board-field__front-text">к/с</span>
        </div>
        <div
          className="board-field__back"
          style={{ transform: rotate ? 'rotateY(0)' : 'rotateY(180deg)' }}
        >
          <img className="board-field__back-image" src={image} alt="" />
        </div>
      </div>
    </div>
  )
}

export default BoardField
