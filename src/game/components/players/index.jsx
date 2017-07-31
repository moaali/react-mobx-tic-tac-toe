import React, { Component } from 'react';
import BoardStore from '../../store';
import { observer } from 'mobx-react'
import './index.scss';

@observer
export default class Players extends Component {
  constructor() {
    super();
    this.store = BoardStore
  }

  handleClick(e) {
    if (!this.store.init && !this.store.dual) {
      const defaultPlayer = e.target.value;
      this.store.setPlayer(defaultPlayer)
      this.setActive(this.store.getTurn());

      if (defaultPlayer === 'O') {
        this.store.init = true
        this.store.moveOpponent()
      }
    }
  }

  render() {
    let status;

    if (!this.store.init && !this.store.dual) {
      status = <p>Start Game or Select a Player by clicking its symbol below.</p>
    } else {
      status = <p>
        <span id="turnPlayer" className={this.store.turn === 'X' ? 'X' : 'O'}>{ this.store.turn }</span>
        <span>Turn</span>
      </p>
    }

    return (
      <div>
        <div id="status">
          { status }
        </div>
        <div id="chooseBtns">
          <button className={ this.store.turn === 'X' ? 'btn-player active X' : 'btn-player X' } value='X'  onClick={ (e) => { this.handleClick(e) } } >
            X
          </button>
          <button className={ this.store.turn === 'O' ? 'btn-player active O' : 'btn-player O' } value='O'  onClick={ (e) => { this.handleClick(e) } } >
            O
          </button>
        </div>
      </div>
    )
  }

  setActive(val) {
    let
      btns      = document.querySelectorAll('.btn-player'),
      targetBtn = Array.prototype.find.call(btns, mem => mem.outerHTML.indexOf(`value="${val}"`)  !== -1 );

    btns.forEach(btn => {
      btn.classList.remove('active')
    })

    targetBtn.classList.add('active');
  }
}
