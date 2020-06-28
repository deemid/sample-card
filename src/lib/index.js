export class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
    this.flipped = false
  }
}

export class Deck {
  constructor() {
    let suits = ['diamond', 'heart', 'spade', 'club']
    let values = Array.from(Array(13).keys()).map((i) => i + 1)
    let cards = []
    suits.forEach((suit) => {
      cards = [
        ...cards,
        ...values.map((value) => {
          return new Card(suit, value)
        }),
      ]
    })
    this.cards = [...cards]
    this.drawnCards = []
  }

  shuffle() {
    let copy = [],
      n = this.cards.length,
      i

    while (n) {
      i = Math.floor(Math.random() * this.cards.length)

      if (i in this.cards) {
        copy.push(this.cards[i])
        delete this.cards[i]
        n--
      }
    }

    this.cards = [...copy]
  }

  draw(toRemove) {
    if (this.cards.length > 0) {
      let lastCard = this.cards.pop()
      if (!toRemove) {
        this.drawnCards.push(lastCard)
      }
      return lastCard
    } else {
      return null
    }
  }
}

export class Game {
  constructor() {
    this.state = {
      firstIndex: null,
      secondIndex: null,
    }
    this.initialize()
  }

  initialize() {
    this.deck = new Deck()
    this.deck.shuffle()

    let columnsCount = 7
    let cardsForColumnsCount = (1 + 7) * (7 / 2)
    let cardsForColumns = []
    for (let i = 0; i < cardsForColumnsCount; i++) {
      cardsForColumns.push(this.deck.draw(true))
    }

    this.columns = Array.from(Array(columnsCount).keys()).map((i) => [])

    let index = 0
    while(cardsForColumns.length) {
      if (this.columns[index].length <= index) {
        this.columns[index].push(cardsForColumns.pop())
      }
      index ++
      if (index > 6) {
        index = 0
      }
    }

    // initialize columns

    this.suits = {
      diamond: [],
      heart: [],
      spade: [],
      club: []
    }
  }

  moveCard(firstIndex, secondIndex) {
    console.log({ columns: this.columns, firstIndex, secondIndex  })
    this.columns[secondIndex].push(this.columns[firstIndex].pop())

    // reset
    this.state = {
      firstIndex: null,
      secondIndex: null,
    }
  }

  selectColumn(index) {
    const { firstIndex, secondIndex } = this.state
    if (!firstIndex) {
      this.state.firstIndex = index
      return
    }

    if (!secondIndex) {
      this.state.secondIndex = index
      this.moveCard(this.state.firstIndex, this.state.secondIndex)
      return
    }
    
  }
}
