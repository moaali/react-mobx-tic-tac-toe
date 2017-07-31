import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react';
import './index.scss';

@observer
export default class History extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  handleClick(e) {
    let idx = parseInt(e.target.getAttribute('data-id'), 10);

    this.store.snapIdx = idx;
    this.store.navHistory(idx)
    this.store.setPrevHistory(idx)
  }

  render() {
    return (
      <div>
        {this.store.history.map((snap, idx) => {
          return (
            <div className="historyBoard" data-id={idx} key={idx} onClick={ e => { this.handleClick(e) } }>
              <span className="cellsHolder" href='#' data-id={idx}>
                {
                  snap.board.map((cell, j) => {
                    return (
                      <span className={ cell ? cell + " cell cell-history" : "cell cell-history"} key={j}  data-id={idx}>{cell}</span>
                    )
                  })
                }
              </span>
            </div>
          )
        })}</div>
    )
  }
}
