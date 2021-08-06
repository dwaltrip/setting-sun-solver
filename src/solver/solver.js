import { parseBoard, TYPE_NAME_TO_PIECE_SYMBOL_MAP } from './parser';

// ---- Helpers ----

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

export { boardToString };
