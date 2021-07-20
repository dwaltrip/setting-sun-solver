
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
function parseBoard(boardString) {
  const lines = boardString.split('\n');

  // check for line length consistency
  const expectedWidth = boardString.length / lines.length;
  const linesAreSameLength = lines.every(x => x.length === expectedWidth);
  assert(linesAreSameLength, 'Lines are not same length!');

  const pieces = [];
  lines.forEach((line, y) => {
    line.forEach((symbol, x) => {
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
    const { type, pos } = piece;
    for (let dy = 0; dy < type.height; dy++) {
      for (let dx = 0; dx < type.width; dx++) {
        const y = pos.y + dy;
        const x = pos.x + dx;
        assert(!grid[y][x], `Multiple pieces claim (x: ${x}, y: ${y})`);
        grid[y][x] = piece;
      }
    }
  });

  return { pieces, grid };
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

/* ---------------------

  * - - - - *
  | v b _ v |
  | _ _ _ _ |
  | _ h _ _ |
  | v s s v |
  | _ s s _ |
  * - - - - *

  v b _ v
  _ _ _ _
  _ h _ _
  v s s v
  _ s s _

  vb.v
  ....
  .h..
  vssv
  .ss.

  v b . v
  . . . .
  . h . .
  v s s v
  . s s .

  #---------------------#
  | +--+ +-------+ +--+ |
  | |  | |       | |  | |
  | |  | |       | |  | |
  | +--+ +-------+ +--+ |
  |      +-------+      |
  |      +-------+      |
  | +-------+ +-------+ |
  | +-------+ +-------+ |
  | +--+ +--+ +--+ +--+ |
  | |  | +--+ +--+ |  | |
  | |  | +--+ +--+ |  | |
  | +--+ +--+ +--+ +--+ |
  #---------------------#

  #----------------------------------#
  |  +----+  +------------+  +----+  |
  |  |    |  |            |  |    |  |
  |  |    |  |            |  |    |  |
  |  |    |  |            |  |    |  |
  |  |    |  |            |  |    |  |
  |  +----+  +------------+  +----+  |
  |          +------------+          |
  |          |            |          |
  |          +------------+          |
  |  +------------+  +------------+  |
  |  |            |  |            |  |
  |  +------------+  +------------+  |
  |  +----+  +----+  +----+  +----+  |
  |  |    |  |    |  |    |  |    |  |
  |  |    |  +----+  +----+  |    |  |
  |  |    |  +----+  +----+  |    |  |
  |  |    |  |    |  |    |  |    |  |
  |  +----+  +----+  +----+  +----+  |
  #----------------------------------#

  list = [
    { type: vert_2x1, topLeftPos: (1, 2) },
    { type: vert_2x1, topLeftPos: (1, 5) },
    { type: vert_2x1, topLeftPos: (4, 2) },
    { type: vert_2x1, topLeftPos: (4, 5) },

    { type: small_1x1, topLeftPos: (2, 1) },
    { type: small_1x1, topLeftPos: (3, 1) },
    { type: small_1x1, topLeftPos: (2, 2) },
    { type: small_1x1, topLeftPos: (3, 2) },

    { type: horiz_2x1, topLeftPos: (2, 3) },
    { type: big_2x2, topLeftPos: (2, 5) },
  ]
*/ 
