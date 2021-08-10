import { assert } from "../lib/assert";
import { makeDupeFilter } from "../lib/make-dupe-filter";

import { parseBoard } from './parser';
import { getPieceCoords } from './piece';
import { Node } from './graph';

function solveBoard(boardString) {
  const startingBoard = parseBoard(boardString);
  const startingNode = new Node({ board: startingBoard });

  const boardStringToNode = {};
  boardStringToNode[startingBoard.stringRepr] = startingNode;

  const unvisitedNodes = [];
  let currentNode = startingNode;
  let done = false;

  while (!done) {
    const currentBoard = currentNode.board;
    const moves = getMoves(currentBoard);

    moves.forEach(move => {
      const potentialNewBoard = currentBoard.applyMove(move);
      const stringRepr = potentialNewBoard.stringRepr;

      if (!(stringRepr in boardStringToNode)) {
        const newNode = new Node({ board: potentialNewBoard });
        boardStringToNode[stringRepr] = newNode;
        unvisitedNodes.push(newNode);
      }
      const targetNode = boardStringToNode[stringRepr];

      // Create edges between the nodes
      const { piece, direction } = move;
      currentNode.edges.push({
        move: { startingPos: { ...piece.pos }, direction },
        from: currentNode,
        to: targetNode,
      });
      targetNode.edges.push({
        move: {
          startingPos: {
            x: piece.pos.x + direction.dx,
            y: piece.pos.y + direction.dy,
          },
          direction: { dx: -1 * direction.dx, dy: -1 * direction.dy },
        },
        from: targetNode,
        to: currentNode,
      });
    });

    if (unvisitedNodes.length === 0) {
      done = true;
    }
    else {
      currentNode = unvisitedNodes.pop();
    }
  }

  return startingNode;
}

function getMoves(board) {
  // This removes movements with duplicate "piece", "direction" combos.
  const excludeDupeMovements = makeDupeFilter(
    ({ piece, direction: { dx, dy } }) => `(${piece.id},${dx},${dy})`,
  );

  // TODO: This doesn't need to be recomputed each time
  const gridCoords = listGridCoords(board.grid);

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
  return potentialMovements.filter(
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
}

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
