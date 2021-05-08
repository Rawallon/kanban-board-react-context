import React from 'react';
import ReactDOM from 'react-dom';

import { CardsContextProvider } from './context/CardContext';
import Board from './page/Board';

ReactDOM.render(
  <CardsContextProvider>
    <Board />
  </CardsContextProvider>,
  document.getElementById('root'),
);
