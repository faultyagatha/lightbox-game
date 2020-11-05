import React from 'react';

import './index.css';

// type CellProps = (
//   {
//     isLit,
//   }: {
//     isLit: boolean;
//     // flipCellsAround(): void
//   }
// ) => JSX.Element;

// const Cell: CellProps = ({ isLit, }) => {

//   const handleClick = () => {
//     // props.flipCellsAround!();
//     console.log('clicked');
//   };

//   let classes = "cell" + (isLit ? " cell-lit" : "");

//   return (
//     <td className="cell-lit" onClick={handleClick} />
//   )
// }

// export default Cell;

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

/** interface describing properies of a stateless component */
interface ICellProps {
  isLit: boolean;
  flipCellsAround(): void;
};


class Cell extends React.Component<ICellProps> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAround();
  }

  render() {
    let classes = "cell" + (this.props.isLit ? " cell-lit" : "");

    return (
      <td className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell;
