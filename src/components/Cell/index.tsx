import React from 'react';

import './index.css';

/** A single cell on the board.
 * Stateless component; two props:
 * - flipCellsAround: a function that flips this
 *   cell and the cells around it;
 * - isLit: boolean, is this cell lit?
 **/

/** functional component */
type CellProps = (
  {
    isLit,
    flipCellsAround
  }: {
    isLit: boolean;
    flipCellsAround(): void
  }
) => JSX.Element;

const Cell: CellProps = ({ isLit, flipCellsAround }) => {

  const handleClick = () => {
    flipCellsAround();
  };

  let classes = "cell" + (isLit ? " cell-lit" : "");

  return (
    <td className={classes} onClick={handleClick} />
  )
}

export default Cell;

/** class-based component */
/** interface describing properies of a stateless component */
// interface ICellProps {
//   isLit: boolean;
//   flipCellsAround(): void;
// };


// class Cell extends React.Component<ICellProps> {
//   constructor(props: any) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(e: any) {
//     // call up to the board to flip cells around this cell
//     this.props.flipCellsAround();
//   }

//   render() {
//     let classes = "cell" + (this.props.isLit ? " cell-lit" : "");

//     return (
//       <td className={classes} onClick={this.handleClick} />
//     )
//   }
// }

// export default Cell;
