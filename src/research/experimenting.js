import { findShortestPath } from '../solver/graph';
import { parseBoard } from '../solver/parser';
import { solveBoard } from '../solver/solver';

import { settingSunBoard } from "./example-boards";

import { Board } from "../components/board";
import { PlaybackSolution } from '../components/playback-solution';

// const { startingNode, nodeLookup } = solveBoard(exampleBoard2);
// const { startingNode, nodeLookup } = solveBoard(exampleBoard3);

const { startingNode, nodeLookup } = solveBoard(settingSunBoard);
const board = startingNode.data.board;

// randomly chosen solution for setting sun
const solutionKey = (
`ssvv
vv..
..h.
.b.s
...s`
);

const solutionPath = findShortestPath(
  nodeLookup,
  startingNode.data.board.stringRepr,
  solutionKey
);

console.log('-----------')
console.log(solutionPath);
console.log('-----------')

let solutionCounter = 0;
for (let node of Object.values(nodeLookup)) {
  const board = node.data.board;
  const pieceMaybe = board.getCoord({ x: 1, y: 3 });
  if (
    pieceMaybe &&
    pieceMaybe.type.name === 'P_2X2_SQUARE' &&
    pieceMaybe.pos.y === 3 && 
    pieceMaybe.pos.x === 1
  ) {
    // console.log('-----------------------------');
    // console.log(board.stringRepr);
    // console.log('-----------------------------');
    solutionCounter += 1;
    // break;
  }
}
console.log('solutionCounter:', solutionCounter);

function Experimenting() {
  return (
    <Board pieces={board.pieces} cols={board.width} rows={board.height}/>
    // <PlaybackSolution
    //   solutionPath={solutionPath}
    //   nodeLookup={nodeLookup}
    // />
  );
};

export { Experimenting };
