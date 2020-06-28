import React, { useState, useEffect } from 'react';
import { Card, Game, Deck } from './lib'
import CardView from './components/Card'

function App() {
  const [gameData, setGameData] = useState(new Game())
  const [game, setGame] = useState({
    state: gameData.state,
    deck: gameData.deck,
    suits: gameData.suits,
    columns: gameData.columns,
  })

  // useEffect(() => {
  //   let game = new Game()
  // }, [])
  const updateGame = () => {
    let newGameData = { ...gameData }
    setGame({ ...newGameData })
  }

  const renderDeck = () => {
    return game.deck.cards.map((card, key) => {
      return <CardView card={card} key={key} />
    })
  }

  const renderDrawnCards = () => {
    return game.deck.drawnCards.map((card, key) => {
      return <CardView card={card} key={key} />
    })
  }

  const selectColumn = index => {
    gameData.selectColumn(index)
    updateGame()
  }

  const renderColumns = () => {
    return game.columns.map((columnCards, key) => {
      return <div className="column" key={key} onClick={() => { selectColumn(key) }}>
        { 
          columnCards.map((card, index) => {
            return <CardView card={card} key={index} />
          })
        }
      </div>
    })
  }

  const draw = () => {
    gameData.deck.draw()
    updateGame()
  }

window.game = game
  return (
    <div className="App">
      {/* <CardView card={card} /> */}
      <h1>Deck</h1>
      <button onClick={draw}>Draw</button>
      <div>
        { renderDeck() }
      </div>
      <h1>Drawn Cards</h1>
      <div>
        { renderDrawnCards() }
      </div>
      <h1>Columns</h1>
      <div className="columns">
        { renderColumns() }
      </div>
      <pre> { JSON.stringify(game.state, null, 2) } </pre>
    </div>
  );
}

export default App;
