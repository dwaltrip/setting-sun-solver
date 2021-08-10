import { assert } from "../lib/assert";
import { getPieceCoords } from './piece';
import { TYPE_NAME_TO_PIECE_SYMBOL_MAP } from './symbols';

const NEIGHBOR_VECTORS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

class Board {
  constructor({ pieces, height, width }) {
    this.height = height;
    this.width = width;
    this.pieces = pieces;
    this.grid = buildGrid({ pieces, height, width });
    this.stringRepr = boardGridToString(this.grid);
  }

  getCoord({ x, y }) {
    return this.grid[y][x];
  }

  // TODO: this could be a iterator generator?
  getNeighborCoords({ x, y }) {
    return NEIGHBOR_VECTORS.reduce((memo, [dx, dy]) => {
      const coord = { x: x + dx, y: y + dy };
      if (this.isValidCoord(coord)) {
        memo.push(coord);
      }
      return memo;
    }, []);
  }

  isValidCoord({ x, y }) {
    return (
      x >= 0 &&
      y >= 0 && 
      x < this.width &&
      y < this.height
    );
  }

  // This produces a new board
  applyMove(move) {
    const { piece: pieceToMove, direction: { dx, dy } } = move;

    const clonedPieces = this.pieces.map(piece => {
      const newPiece = clonePiece(piece);
      if (newPiece.id === pieceToMove.id) {
        newPiece.pos.x += dx;
        newPiece.pos.y += dy;
      }
      return newPiece;
    });

    return new Board({
      pieces: clonedPieces,
      height: this.height,
      width: this.width,
    });
  }

  // TODO: This might be superfluous!!
  //   It may not be better than simply creating a new Board,
  //   even if it is not a new position.
  getBoardStringForMove(move) {
    const { piece: pieceToMove, direction: { dx, dy } } = move;
    const piecesForTempGrid = this.pieces.map(piece => {
      return (piece.id === pieceToMove.id ?
        cloneAndMovePiece(piece, { dx, dy }) :
        piece
      );
    });
    return boardGridToString(buildGrid(piecesForTempGrid));
  }
}

function cloneAndMovePiece(piece, { dx, dy }) {
  const clone = clonePiece(piece);
  clone.pos.x += dx;
  clone.pos.y += dy;
  return clone;
}

function clonePiece({ id, pos, type }) {
  // NOTE: we mainly just need to ensure `pos` is a new obj
  return { id, pos: { ...pos }, type };
}

// TODO: create unit test for this
function boardGridToString(grid) {
  const seenPiece = {};
  return grid.map(row => {
    return row.map(piece => {
      // Only return the symbol for the top-left most coord in the piece.
      // Otherwise, return '.'
      if (piece === null || piece.id in seenPiece) {
        return '.';
      }
      seenPiece[piece.id] = true;
      return TYPE_NAME_TO_PIECE_SYMBOL_MAP[piece.type.name];
    }).join('');
  }).join('\n');
}

function buildGrid({ height, width, pieces }) {
  const grid = new Array(height)
    .fill(null)
    .map(_ => new Array(width).fill(null));

  pieces.forEach(piece => {
    getPieceCoords(piece).forEach(({ x, y }) => {
      assert(!grid[y][x], `Multiple pieces claim (x: ${x}, y: ${y})`);
      assert(x < width, 'Piece does not fit on grid');
      assert(y < height, 'Piece does not fit on grid');
      grid[y][x] = piece;
    });
  });

  return grid;
}

export { Board };
