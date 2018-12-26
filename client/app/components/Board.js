import React, { Component } from 'react';
import Edit from './Edit';
import fetch from 'isomorphic-fetch';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabledCards: [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ],
      board: null,
      activeCard: '',
      showAnswer: false,
      editing: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleQAClick = this.handleQAClick.bind(this);
  }

  componentDidMount() {
    var self = this;
    fetch('/api/board/get').then((res) => res.json()).
      then((data) => {
        self.setState({ board: data });
      });
  }

  handleClick(name) {
    this.setState({ activeCard: name });
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  }

  handleQAClick() {
    if (this.state.showAnswer) {
      this.setState({ activeCard:'', showAnswer: false });
    }
    else {
      this.setState({ showAnswer: true });
    }
  }

  render() {
    var self = this;
    return <div className="game">
      <p onClick={this.toggleEdit}>ADMIN ONLY</p>
      {!self.state.editing ?
        (self.state.board !== null ?
          (self.state.activeCard === '' ? (
            <table>
              <thead>
                <tr>
                  {self.state.board.categories.map(
                    (category, i) =>
                      <td key={i}>
                        <div className="panel" >{category.name}</div>
                      </td>
                  )}
                </tr>
              </thead>
              <tbody>
                {
                  [0,1,2,3,4].map(function(i) {
                    return <tr key={i}>{self.state.board.categories.map(
                      (category, j) =>
                        <td className="panel" key={j+ '-' + i}>
                          <div onClick={() => {
                            self.handleClick(j + '-' + i); }
                          } name={j + '-' + i }>
                            {(i + 1) * 100}
                          </div>
                        </td>
                    )}</tr>;
                  })
                }
              </tbody>
            </table>
          ) : (
            <div className="active-card" onClick={self.handleQAClick}>
              <p>{self.state.board.categories[self.state
                .activeCard.split('-')[0]].cards[self.state.activeCard
                .split('-')[1]][self.state.showAnswer ?
                'answer' : 'question']}</p>
            </div>
          )) : <p>Still fixing stuff!</p>) : <Edit />}</div>
  }
}

export default Board;
