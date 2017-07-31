import React, { Component } from 'react';
import BoardStore from '../../../../store';
import { observer } from 'mobx-react'
import './index.scss';

export default class Square extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  handlePos() {
    this.store.init = true
    this.store.setState(this.props.idx, this.store.getTurn())
  }

  handleClick(e) {
    let
      idx = this.props.idx;

    if (!this.store.winner && this.store.isEmpty(idx)) {
      if (!this.store.dual) {
        if (this.store.turn === this.store.player) {
          this.handlePos();
        }

        setTimeout(() => {
          this.store.moveOpponent();
        }, 300);
      } else {
        this.handlePos();
      }
    }
  }

  render() {
    return (
      <button className={ this.props.value ? this.props.value + ' cell' : 'cell' } onClick={ e => { this.handleClick(e) } } >
        { this.props.value }
      </button>
    )
  }
}
