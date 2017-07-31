import React from 'react';
import Game  from './game';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

render( <AppContainer><Game /></AppContainer>, document.querySelector("#root"));

if (module && module.hot) {
  module.hot.accept('./game/index.jsx', () => {
    const Game = require('./game/index.jsx').default;
    render(
      <AppContainer>
        <Game />
      </AppContainer>,
      document.querySelector("#root")
    );
  });
}
