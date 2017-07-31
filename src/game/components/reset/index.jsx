import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react'
import './index.scss';

export default class Reset extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  render() {
    return (
      <button id="reset" onClick={ e => { this.store.reset() } }>
        Reset Game
      </button>
    )
  }
}
