
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

const TYPE_NAME_TO_PIECE_SYMBOL_MAP = {
  [P_1X1_SQUARE]: 's',
  [P_2X1_VERT]: 'v',
  [P_2X1_HORIZ]: 'h',
  [P_2X2_SQUARE]: 'b',
};

export {
  PIECE_SYMBOL_TO_TYPE_MAP,
  TYPE_NAME_TO_PIECE_SYMBOL_MAP,
  BLANK_OR_NOT_TOP_LEFT_OF_PIECE,

  P_1X1_SQUARE,
  P_2X1_HORIZ,
  P_2X1_VERT,
  P_2X2_SQUARE,
};
