import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.state = {
      board: {
        categories: [
          {
            name: '',
            cards: [
              { difficulty: 1 },
              { difficulty: 2 },
              { difficulty: 3 },
              { difficulty: 4 },
              { difficulty: 5 }
            ]
          },
          {
            name: '',
            cards: [
              { difficulty: 1 },
              { difficulty: 2 },
              { difficulty: 3 },
              { difficulty: 4 },
              { difficulty: 5 }
            ]
          },
          {
            name: '',
            cards: [
              { difficulty: 1 },
              { difficulty: 2 },
              { difficulty: 3 },
              { difficulty: 4 },
              { difficulty: 5 }
            ]
          },
          {
            name: '',
            cards: [
              { difficulty: 1 },
              { difficulty: 2 },
              { difficulty: 3 },
              { difficulty: 4 },
              { difficulty: 5 }
            ]
          },
          {
            name: '',
            cards: [
              { difficulty: 1 },
              { difficulty: 2 },
              { difficulty: 3 },
              { difficulty: 4 },
              { difficulty: 5 }
            ]
          },
        ],
      }
    }
  }

  componentDidMount() {
    var self = this;
    fetch('/api/board/get').then(res => res.json()).then((data) => {
      if (data !== null) self.setState({ board: data });
    });
  }

  _onSubmit() {
    fetch('/api/board/save', {
      method: 'POST',
      body: JSON.stringify(this.state.board),
      useQueryString: false,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.pathname = '/';
  }

  handleCardChange(row, col, attr, what) {
    var board = this.state.board;
    board.categories[row].cards[col][attr] = what;
    this.setState({ board: board });
  }

  handleCategoryChange(row, what) {
    var board = this.state.board;
    board.categories[row].name = what;
    this.setState({ board: board });
  }

  render() {
    var cardHandler = this.handleCardChange,
      handleCategoryChange = this.handleCategoryChange,
      board = this.state.board;

    return (
      <div>
        {board.categories.map(function(category, i) {
          return (
            <div key={i}>
              <input type="text" onChange={(e) => {
                handleCategoryChange(i, e.target.value);
              }} value={category.name ? category.name : ''} />
              {category.cards.map(function(card, j) {
                return (
                  <div key={i + '-' + j}>
                    <input type="text"
                      onChange={(e) => {
                        cardHandler(i,j,'question',e.target.value);
                      }}
                      name={'card-' + (i + 1) + '-' + (j + 1) + 'question'}
                      value={card.question ? card.question : ''}/>
                    <input type="text"
                      onChange={(e) => {
                        cardHandler(i,j,'answer',e.target.value);
                      }}
                      name={'card-' + (i + 1) + '-' + (j + 1) + 'answer'}
                      value={card.answer ? card.answer : ''}/>
                    <input type="number" disabled={true}
                      onChange={(e) => {
                        cardHandler(i,j,'difficulty',e.target.value);
                      }}
                      name={'card-' + (i + 1) + '-' + (j + 1) + 'difficulty'}
                      value={card.difficulty}/>
                  </div>
                );
              })}
            </div>
          );
        })}
        <input type='button' onClick={this._onSubmit} value="Submit Changes" />
      </div>
    );
  }
}

export default Edit;
