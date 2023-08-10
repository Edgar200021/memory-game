import React, { ReactNode, useState } from 'react'
import './Board.css'
import BoardField from '../BoardField/BoardField'

interface BoardProps {
  children: ReactNode
}

const Board = ({ children }: BoardProps) => {
  return <div className="board">{children}</div>
}
export default Board
