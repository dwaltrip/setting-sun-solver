import { TYPE_NAME_TO_PIECE_SYMBOL_MAP } from './symbols';

const NEIGHBOR_VECTORS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

class Board {
  constructor({ pieces, grid }) {
    this.pieces = pieces;

    if (!grid || grid.length === 0) {
      throw new Error(`Something wrong with the grid: ${grid}`);
    }
    this.grid = grid;
    this.height = grid.length;
    this.width = grid[0].length;

    this.stringRepr = boardToString(grid);
  }

  getCoord({ x, y }) {
    return this.grid[y][x];
  }

  // TODO: this could be a iterator generator?
  getNeighborCoords({ x, y }) {
    return NEIGHBOR_VECTORS.reduce((memo, [dx, dy]) => {
      const coord = { 'x': x + dx, 'y': y + dy };
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
}

// TODO: create unit test for this
function boardToString(grid) {
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

export { Board };
