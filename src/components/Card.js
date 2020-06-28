import React from 'react'

const Card = ({ card, onClick = () => {} }) => {
  let suit = null

  switch (card.suit) {
    case 'diamond':
      suit = '♢'
      break
    case 'heart':
      suit = '♡'
      break
    case 'spade':
      suit = '♠'
      break
    case 'club':
      suit = '♣'
      break
    default:
      suit = null
  }

  if (!suit) {
    return null
  }

  const isRed = card.suit === 'diamond' || card.suit === 'heart'
  return (
    <span
      style={{
        color: isRed ? 'red' : 'black',
        display: 'inline-block',
        padding: '4px 8px',
        border: '1px solid black',
        margin: 2
      }}
      onClick={onClick}
    >{suit} {card.value}</span>
  )
}

export default Card

