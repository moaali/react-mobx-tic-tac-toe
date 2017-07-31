import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react'
import './index.scss';

@observer
export default class Result extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  render() {
    let setContent = () => {
      let
        content = null,
        winner  = this.store.winner;

      if (winner)
        content = <div className="result">{ winner } Wins.</div>;

      if (!winner && this.store.isFinished())
        content = <div className="result">It's a Tie.</div>;

      return content
    }

    return (
      <div>{ setContent() }</div>
    )
  }
}


