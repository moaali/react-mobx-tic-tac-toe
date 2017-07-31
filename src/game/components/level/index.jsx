import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react'
import './index.scss';

export default class Level extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  changeHandler(e) {
    let mode = parseInt(e.target.value, 10);

    this.store.reset();
    this.store.setLevel(mode);

    if (mode === 2)
      this.store.dual = true
  }

  render() {
    return (
      <select id="select" onChange={e => { this.changeHandler(e) }}>
        <option value='0'>Easy</option>
        <option value='1'>Hard</option>
        <option value='2'>Play With Friend</option>
      </select>
    )
  }
}
