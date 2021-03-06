import { assert } from "../lib/assert";
import { Board } from './board';

import {
  BLANK_OR_NOT_TOP_LEFT_OF_PIECE,
  PIECE_SYMBOL_TO_TYPE_MAP,
} from './symbols';

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
  let counter = 1;
  lines.forEach((line, y) => {
    line.split('').forEach((symbol, x) => {
      const type = PIECE_SYMBOL_TO_TYPE_MAP[symbol];
      assert(!!type, `Invalid symbol: ${symbol}`);

      if (type !== BLANK_OR_NOT_TOP_LEFT_OF_PIECE) {
        // pos is the top left position of the piece
        // convert id to string as we will use it in object lookups later
        pieces.push({ type, pos: { x, y }, id: `${counter}` });
        counter += 1;
      }
    });
  });

  return new Board({ pieces, height: lines.length, width: expectedWidth });
}

export { parseBoard };
