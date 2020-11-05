import React, { useState, useEffect } from 'react';

import Cell from '../Cell';
import './index.css';

// /** interface describing properties of a stateful Board component */
// // interface IBoard {
// //   nRows: number;
// //   nCols: number;
// //   chanceOfLight: number;
// // }

// /** helper function to create a random board */
// const createRandomBoolBoard = (nRows: number, nCols: number, chanceOfLight: number): boolean[][] => {
//   let board: any = [];
//   for (let y = 0; y < nRows; y++) {
//     let row: boolean[] = [];
//     for (let x = 0; x < nCols; x++) {
//       //random bool values
//       row.push(Math.random() < chanceOfLight);
//     }
//     board.push(row);
//   }
//   return board;
// };

// const Board = () => {
//   const nRows: number = 5;
//   const nCols: number = 5;
//   const chanceOfLight = 0.2;

//   const [hasWon, setHasWon] = useState(false);
//   const [board, setBoard] = useState(createRandomBoolBoard(nRows, nCols, chanceOfLight));
//   console.log(board);

//   const flipCellsAround = (coords: string) => {
//     let [y, x] = coords.split("-").map(Number);
//     let newBoard = board;

//     const flipCell = (y: number, x: number) => {
//       // if this coord is actually on board, flip it
//       if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
//         newBoard[y][x] = !newBoard[y][x];
//       }
//     }

//     flipCell(y, x); //Flip initial cell
//     flipCell(y, x - 1); //flip left
//     flipCell(y, x + 1); //flip right
//     flipCell(y - 1, x); //flip below
//     flipCell(y + 1, x); //flip above

//     console.log(newBoard);

//     // win when every cell is turned off
//     setHasWon(newBoard.every(row => row.every(cell => !cell)));
//     setBoard(newBoard);
//   };

//   const renderTable = () => {
//     let tableBoard = [];
//     for (let y = 0; y < nRows; y++) {
//       let row: any[] = [];
//       for (let x = 0; x < nCols; x++) {
//         let coords = `${y}-${x}`;
//         row.push(
//           <Cell
//             key={coords}
//             isLit={board[x][y]}
//           // flipCellsAround={() => flipCellsAround(coords)}
//           />
//         );
//       }
//       tableBoard.push(<tr key={y}>{row}</tr>);
//     }

//     return (
//       <table className='board'>
//         <tbody>{tableBoard}</tbody>
//       </table>
//     );
//   }
//   console.log(renderTable())
//   return (
//     <>
//       {hasWon ? (
//         <div className='winner'>
//           <span className='neon-orange'>YOU</span>
//           <span className='neon-blue'>WIN!</span>
//         </div>
//       ) : (
//           <div>
//             <div className='board-title'>
//               {/* <div className='neon-orange'>Lights</div>
//               <div className='neon-blue'>Out</div> */}
//             </div>
//             {renderTable()}
//             <Cell isLit={true} />
//             <Cell isLit={true} />
//             <Cell isLit={true} />
//           </div>
//         )}
//     </>
//   );
// }

// export default Board;


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceOfLight: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

interface IBoardProps {
  nRows: number;
  nCols: number;
  chanceOfLight: number;
};

interface IBoardState {
  hasWon: boolean;
  board: any;
}

class Board extends React.Component<IBoardProps, IBoardState> {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceOfLight: 0.25
  };

  constructor(props: any) {
    super(props);

    // set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        row.push(Math.random() < this.props.chanceOfLight);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord: string) {
    let { nCols, nRows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y: number, x: number) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    // win when every cell is turned off
    // determine is the game has been won
    let hasWon = board.every((row: any[]) => row.every((cell: any) => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */
  makeTable() {
    let tblBoard = [];
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for (let x = 0; x < this.props.nCols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAround={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className='board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
        ) : (
            <div>
              <div className='board-title'>
                {/* <div className='neon-orange'>Lights</div>
                <div className='neon-blue'>Out</div> */}
              </div>
              {this.makeTable()}
            </div>
          )}
      </div>
    );
  }
}

export default Board;
