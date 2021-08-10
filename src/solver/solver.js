import { assert } from "../lib/assert";
import { makeDupeFilter } from "../lib/make-dupe-filter";

import { parseBoard } from './parser';
import { getPieceCoords } from './piece';
import { Node } from './graph';

function solveBoard(boardString) {
  const startingBoard = parseBoard(boardString);
  const startingNode = new Node({ startingBoard });

  const boardStringToNode = {};
  boardStringToNode[startingBoard.stringRepr] = startingNode;

  const gridCoords = listGridCoords(startingBoard.grid);

  function getMoves(board) {
    // step 1: iterate through grid looking for coords of empty spaces ("null")
    // step 2: create list of pieces at all neighboring coords of emtpy spaces
    // step 3: if piece can move into the empty space, add that movement to list
    // step 4: return list of possible movements

    // Todo:
    //   how to represent movement? maybe just: { piece, direction }
    //   how to represent piece? with an ID?
    // ------------------------------------------

    // This removes movements with duplicate "piece", "direction" combos.
    const excludeDupeMovements = makeDupeFilter(
      ({ piece, direction: { dx, dy } }) => `(${piece.id},${dx},${dy})`,
    );
    const potentialMovements = gridCoords
      .filter(coord => board.getCoord(coord) === null)
      // .filter(coord => board.isCoordEmpty(coord))
      .flatMap(coord => {
        return board
          .getNeighborCoords(coord)
          .map(neighborCoord => board.getCoord(neighborCoord))
          .filter(piece => !!piece)
          .map(piece => {
            return { piece, direction: getMovementVector(piece, coord) };
          })
          .filter(excludeDupeMovements);
      });

    // Exclude potential movements where the piece doesn't "fit",
    // as it clashes with some other piece.
    const validMovements = potentialMovements.filter(
      ({ piece, direction: { dx, dy } }) => {
        const newCoords = getPieceCoords(piece).map(({ x, y }) => {
          return { x: x + dx, y: y + dy };
        });

        function coordContainsDifferentPiece(coord) {
          const anotherPieceMaybe = board.getCoord(coord);
          if (anotherPieceMaybe === null) {
            return false;
          }
          return anotherPieceMaybe.id !== piece.id;
        }
        // If any of new coords contain a different piece, the move is invalid.
        return !newCoords.some(coordContainsDifferentPiece);
      }
    );

    validMovements.sort((m1, m2) => {
      const pos1 = m1.piece.pos;
      const pos2 = m2.piece.pos;
      return (pos1.y - pos2.y) || (pos1.x - pos2.x);
    });

    console.log('===== validMovements');
    validMovements.forEach(({ piece: { pos }, direction: { dx, dy }}) => {
      console.log(
        `pos: { x: ${pos.x}, y: ${pos.y} } --`,
        `dir: { dx: ${dx}, dy: ${dy} }`,
      );
    });
    console.log('--------------------');
  }

  getMoves(startingBoard);

  // const startingMoves = getMoves()
  // const movesToTry = 
  
  // steps:
  //    - [x] init graph. create lookup from board state string to node
  //    - add initial....

}

// ---- Helpers ----

function listGridCoords(grid) {
  return grid.flatMap((row, y) => row.map((value, x) => ({ x, y })));
}

function getMovementVector(piece, coord) {
  const topLeft = piece.pos;  
  const { height, width } = piece.type;
  const botRight = { x: piece.pos.x + (width - 1), y: piece.pos.y + (height - 1) };

  const isMovingLeft = topLeft.x < coord.x && botRight.x < coord.x;
  const isMovingRight = topLeft.x > coord.x && botRight.x > coord.x;
  const isMovingUp = topLeft.y > coord.y && botRight.y > coord.y;
  // positive y-direction on the board grid is "down"
  const isMovingDown = topLeft.y < coord.y && botRight.y < coord.y;

  const countTrueVals = (vals) => {
    return vals.reduce((acc, val) => acc + Number(!!val), 0);
  };
  assert(
    countTrueVals([isMovingDown, isMovingUp, isMovingLeft, isMovingRight]) === 1,
    'Piece cannot move to given coord'
  );

  if (isMovingRight) {
    return { dx: 1, dy: 0 };
  }
  if (isMovingLeft) {
    return { dx: -1, dy: 0 };
  }
  if (isMovingDown) {
    return { dx: 0, dy: 1 };
  }
  if (isMovingUp) {
    return { dx: 0, dy: -1 };
  }
}

// ---- Exports ----

export { solveBoard };
