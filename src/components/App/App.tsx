import React, { useEffect, useState } from 'react'
import Board from '../Board/Board'

import './App.css'
import MovesInfo from '../MovesInfo/MovesInfo'
import { boardFields as boards, filterField } from '../../constants/boardField'
import BoardField from '../BoardField/BoardField'
import Modal from '../Modal/Modal'
import { getRandomNumber } from '../../utils/helpers'

export interface Images {
  image1: string
  image2: string
}

const App = () => {
  const [boardFields, setBoardFields] = useState<typeof boards>(boards)
  const [sameImage, setSameImage] = useState<Images>({
    image1: '',
    image2: '',
  })
  const [remainingMoves, setRemainingMoves] = useState(30)
  const [movedMoves, setMovedMoves] = useState(0)

  useEffect(() => {
    if (!sameImage.image1.length || !sameImage.image2.length) return

    const timeout = setTimeout(() => {
      setSameImage({ image1: '', image2: '' })
    }, 1000)

    setRemainingMoves(prev => prev - 1)
    setMovedMoves(prev => prev + 1)

    timeout

    return () => clearTimeout(timeout)
  }, [sameImage.image1, sameImage.image2])

  const resetGame = (): void => {
    const randomIndex: number = getRandomNumber(0, filterField.length - 1)
    console.log(randomIndex)

    setBoardFields(
      boards.sort((a, b) =>
        a.fieldsForFilter[filterField[randomIndex]].localeCompare(
          b.fieldsForFilter[filterField[randomIndex]]
        )
      )
    )
    setRemainingMoves(3)
    setMovedMoves(0)
    setSameImage({
      image1: '',
      image2: '',
    })
  }

  const isLose: boolean =
    boardFields.some(board => board.image !== '') && remainingMoves === 0
  const isWin: boolean =
    boardFields.every(board => board.image === '') && remainingMoves > 0

  return (
    <div className="app">
      <div className="app__inner">
        <h1 className="app__title">MEMORY</h1>

        <div className="app__container">
          <MovesInfo text="сделано ходов" moves={movedMoves} />
          <Board>
            {boardFields.map(({ image, id }) => (
              <BoardField
                id={id}
                key={id}
                image={image}
                sameImage={sameImage}
                setSameImage={setSameImage}
                setBoardFields={setBoardFields}
                boardFields={boardFields}
				remainingMoves={remainingMoves}
				setRemainingMoves={setRemainingMoves}
              />
            ))}
          </Board>
          <MovesInfo text="осталось попыток" moves={remainingMoves} />

          {isLose && (
            <Modal
              message="УВЫ, ВЫ ПРОИГРАЛИ У ВАС КОНЧИЛИСЬ ХОДЫ"
              onClick={resetGame}
            />
          )}
          {isWin && (
            <Modal
              message={`Ура, ВЫ выиграли!это заняло ${movedMoves} ходов`}
              onClick={resetGame}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
