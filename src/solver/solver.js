import { parseBoard } from './parser';
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


    const seenNeighborCoords = {};
    const nieghborCoords = gridCoords
      .filter(coord => board.getCoord(coord) === null)
      .flatMap(coord => {
        const nieghborCoords = board
          .getNeighborCoords(coord)
          // A set would be much better than this ugly filter. But I'm not
          // being careful to ensure no dupe coord objects, which makes JS
          // sets rather inconvenient, as they use object identity.
          .filter(({ x, y }) => {
            const key = `${x},${y}`;
            if (key in seenNeighborCoords) {
              return false;
            }
            seenNeighborCoords[key] = true;
            return true;
          });
        return nieghborCoords;
      });
    nieghborCoords.sort((a, b) => {
      return (a.y - b.y) || (a.x - b.x);
    });

    console.log('===== nieghborCoords');
    nieghborCoords.forEach(c => console.log(c));
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

export { solveBoard };
