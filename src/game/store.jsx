import { action, computed, observable } from "mobx";

const
  PLAYERS = ['X', 'O'],
  WINNING_POSITIONS = [4, 0, 2, 6, 8, 1, 3, 5, 7],
  EASY_MODE_POSITIONS = WINNING_POSITIONS.slice().reverse(),
  WINNING_INSTANCES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

class BoardStore {
  @observable board
  @observable turn
  @observable init
  @observable history
  @observable snapIdx
  @observable winner

  constructor() {
    this.board       = Array(9).fill(null)
    this.turn        = 'X'
    this.player      = 'X'
    this.opponent    = 'O'
    this.level       = 0
    this.init        = false
    this.winner      = null
    this.finished    = false
    this.dual        = false
    this.history     = []
    this.snapIdx     = null
    this.prevHistory = null
  }

  /**
   * Method to reset the game to its intial state
   */
  reset() {
    this.board    = Array(9).fill(null)
    this.turn     = 'X'
    this.player   = 'X'
    this.opponent = 'O'
    this.init     = false
    this.winner   = null
    this.finished = false
    this.history  = []
    this.snapIdx  = null
  }

  /**
   * Method to keep track of game moves
   */
  setHistory() {
    if (!this.dual && this.turn == this.opponent)
      return;

    let
      historyCopy = this.history.slice(0);

    let
      snapshot = {
        __proto__ : null,
        board     : this.board.slice(0),
        turn      : this.turn,
        winner    : this.winner,
        finished  : this.finished
      };

    if (this.prevHistory) {
      let prevHistoryCopy = this.prevHistory.slice(0)
      this.history = [].concat(prevHistoryCopy, snapshot);
      this.prevHistory = null;
      return
    }

    let newHistory = historyCopy.concat(snapshot);
    this.history = [].concat(newHistory)
  }

  /**
   * Method to keep track of all previous moves before the
   * one selected by the user.
   *
   * @param {Number} idx Index of the related board array in history array.
   */
  setPrevHistory(idx) {
    let historyCopy = this.history.slice(0);
    this.prevHistory = [].concat(historyCopy.slice(0, idx + 1))
  }

  /**
   * Method to navigate between different game moves.
   *
   * @param  {Number} idx Index of the related board array in history array.
   */
  navHistory(idx) {
    let
      snapshot = this.history[idx];

    this.board    = snapshot.board.slice(0)
    this.turn     = snapshot.turn
    this.winner   = snapshot.winner
    this.finished = snapshot.finished
  }

  /**
   * Method used as AI when user player vs computer to
   * calculate the next move of the computer based on the
   * game level.
   */
  moveOpponent() {
    if (this.winner) {
      return
    }

    let availablePos = [];

    this.board.forEach((player, idx) => {
      if (player === null) {
        availablePos.push(idx)
      }
    });

    let nextPos;

    switch(this.level) {
      case 0:
        for (let winPos of EASY_MODE_POSITIONS) {
          if (!!~availablePos.indexOf(winPos)) {
            nextPos = winPos;
            break;
          }
        }

        break;

      case 1:
        let possibleWin = this.isAboutToWin();

        if (possibleWin.willWin) {
          let ins = possibleWin.instance

          for (let pos of ins) {
            if (this.board[pos] !== null)
              continue;

            nextPos = pos
          }
        } else {
          for (let winPos of WINNING_POSITIONS) {
            if (!!~availablePos.indexOf(winPos)) {
              nextPos = winPos;
              break;
            }
          }
        }
    }

    this.setState(nextPos, this.opponent)
    this.checkResult()
    this.setTurn(this.player)
  }

  /**
   * Method used to calculate player position in hard
   * mode in order to prevent player from winning.
   */
  isAboutToWin() {
    let
      ret = {
        willWin: false
      };

    WINNING_INSTANCES.forEach((ins, idx, arr) => {
      let filledPos = ins.filter(pos => {
        return this.board[pos] !== null
      })

      if (filledPos.length === 2 && (this.board[filledPos[0]] === this.board[filledPos[1]])) {
        ret = {
          willWin: true,
          instance: ins
        }
      }
    })

    return ret
  }

  /**
   * Method used to set store level based on user choice.
   *
   * @param {Number} level Number represents the game mode hoosed by the user.
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * Method used to set game state - board, history, ...etc.
   * @param {Number} idx Number representing the index of
   *                     the clicked element by the user
   * @param {String} val 'X' or 'O' based on the next turn.
   */
  setState(idx, val) {
    this.board[idx] = val
    this.checkResult();
    this.setTurn();
    this.setHistory();
  }

  /**
   * Method used to check if the clicked postion is already empty
   * and is valid to take a player value.
   *
   * @param  {Number}  idx Number represents the clicked position.
   */
  isEmpty(idx) {
    return this.board[idx] === null
  }

  /**
   * Method used to return the next player to move.
   *
   * @return {String} 'X' of 'O'
   */
  getTurn() {
    return this.turn
  }

  /**
   * Method used to set the next player to move.
   * @param {String} turn 'X' or 'O'
   */
  setTurn(turn) {
    this.turn = turn || PLAYERS[1 - PLAYERS.indexOf(this.turn)]
  }

  /**
   * Method used at the satrt of the game in non-dual mode
   * to define user selection for the player.
   *
   * @param {String} player 'X' or 'O'.
   */
  setPlayer(player) {
    this.player = player
    this.opponent = PLAYERS[1 - PLAYERS.indexOf(this.player)]
  }

  /**
   * Method used to define if the game has been finished of not.
   * @return {Boolean} true if there's no null values left on the board.
   */
  isFinished() {
    return this.board.indexOf(null) === -1
  }

  /**
   * Method to check if there is a winner or a tie.
   */
  checkResult() {
    WINNING_INSTANCES.forEach((ins, idx, arr) => {
      let filledPos = ins.filter(pos => {
        return this.board[pos] !== null
      })

      if (
        filledPos.length === 3 &&
        (this.board[filledPos[0]] === this.board[filledPos[1]]) &&
        (this.board[filledPos[0]] === this.board[filledPos[2]])
      ) {
        this.winner = this.board[ins[0]];
      }

      if (arr.length - 1 === idx) {
        if (this.isFinished() && !this.winner)
          return false
      }
    })
  }
}

export default new BoardStore
