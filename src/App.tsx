import React from 'react';

import './App.css';
import Board from './components/Board';

const App = () => {
  const defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceOfLight: 0.25
  };
  return (
    <div className="app">
      <Board nRows={defaultProps.nrows} nCols={defaultProps.ncols} chanceOfLight={defaultProps.chanceOfLight} />
    </div>
  );
}

export default App;
