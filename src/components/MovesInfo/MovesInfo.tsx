import React from 'react'

import './MovesInfo.css'

interface MovesInfoProps {
  text: string
  moves: number
}



const MovesInfo = ({ text, moves}: MovesInfoProps) => {
  return (
    <div className='moves-info'>
      <span className='moves-info__text'>{text}</span>
      <span className='moves-info__moves'>{moves}</span>
    </div>
  )
}

export default MovesInfo
