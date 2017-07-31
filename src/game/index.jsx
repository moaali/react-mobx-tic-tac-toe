import React, { Component } from 'react';
import Board   from './components/board';
import History from './components/history';
import Players from './components/players';
import Result  from './components/result';
import Level   from './components/level';
import Reset   from './components/reset';
import './index.scss';

export default class Game extends Component {
  render() {
    return (
      <div id="game">
        <div id="gameBody">
          <Level />
          <div>
            <Players />
            <Board />
          </div>
          <div>
            <Result />
          </div>
          <Reset />
        </div>
        <div id="history">
          <h1 id="timeTravel">Time Travel</h1>
          <History />
        </div>
      </div>
    )
  }
}
