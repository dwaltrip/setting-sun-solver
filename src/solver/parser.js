import { forEachPieceCoord } from './piece';

// const boardString = [
//   'vb.v',
//   '....',
//   '.h..',
//   'vssv',
//   '.ss.',
// ].join('\n');

// Board String Format Symbols
// The `P_` prefix stands for "Piece"
const P_2X1_VERT = 'P_2X1_VERT';
const P_2X1_HORIZ = 'P_2X1_HORIZ';
const P_2X2_SQUARE = 'P_2X2_SQUARE';
const P_1X1_SQUARE = 'P_1X1_SQUARE';
const BLANK_OR_NOT_TOP_LEFT_OF_PIECE = 'BLANK_OR_NOT_TOP_LEFT_OF_PIECE';

const PIECE_SYMBOL_TO_TYPE_MAP = {
  's': { width: 1, height: 1, name: P_1X1_SQUARE },
  'v': { width: 1, height: 2, name: P_2X1_VERT },
  'h': { width: 2, height: 1, name: P_2X1_HORIZ },
  'b': { width: 2, height: 2, name: P_2X2_SQUARE },
  '.': BLANK_OR_NOT_TOP_LEFT_OF_PIECE,
};

/*
Example board:
  vb.v
  ....
  .h..
  vssv
  .ss.
*/
function parseBoard(boardStringRaw) {
  // Remove extra whitespace
  const boardString = boardStringRaw
    .trim()
    .split('\n')
    .map(line => line.trim())
    .join('\n');
  const lines = boardString.split('\n');

  // Check for line length consistency
  // There are (lines.length - 1) number of new line chars, which we subtract
  const expectedWidth = (boardString.length - (lines.length - 1 )) / lines.length;
  const linesAreSameLength = lines.every(x => x.length === expectedWidth);
  assert(linesAreSameLength, 'Lines are not same length!');

  const pieces = [];
  lines.forEach((line, y) => {
    line.split('').forEach((symbol, x) => {
      const type = PIECE_SYMBOL_TO_TYPE_MAP[symbol];
      assert(!!type, `Invalid symbol: ${symbol}`);

      if (type !== BLANK_OR_NOT_TOP_LEFT_OF_PIECE) {
        // pos is the top left position of the piece
        pieces.push({ type, pos: { x, y } });
      }
    });
  });

  const grid = new Array(lines.length)
    .fill(null)
    .map(_ => new Array(expectedWidth).fill(null));

  pieces.forEach(piece => {
    forEachPieceCoord(piece, ({ x, y }) => {
      assert(!grid[y][x], `Multiple pieces claim (x: ${x}, y: ${y})`);
      grid[y][x] = piece;
    });
  });
  return { pieces, grid };
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

export { parseBoard };
