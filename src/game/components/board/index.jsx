import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react'
import Square from './components/square';
import './index.scss';

@observer
export default class Board extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  render() {
    return (
      <div className="cellsHolder">
        {
          this.store.board.map((elem, i) => {
            return (
              <Square key={i} idx={i} value={elem} className={elem} />
            )
          })
        }
      </div>
    )
  }
}
