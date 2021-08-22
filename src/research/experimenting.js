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

// NOTE: Due to how the graph is constructed, one move on the solution path
// may take us between Board objects that have multiple piece objects in
// different positions, when visually only one piece has moved. This is
// because we didn't originally traverse the position space that way, and so
// one of the board positions has visually identical pieces swapped with
// respect to other board position.
// This issue only became apparent when I tried to animate the movements
// using CSS transition. On some moves, multiple pieces would move.
// This code rebuilds the Board objects so that only the correct single
// piece object is in a different position, just how it looks visually.
for (let i=0; i < (solutionPath.length - 1); i++) {
  const node = nodeLookup[solutionPath[i]];
  const nextNode = nodeLookup[solutionPath[i+1]];
  const edge = node.edges.filter(e => e.to === nextNode)[0];

  const move = {
    piece: node.data.board.getCoord(edge.move.startingPos),
    direction: edge.move.direction,
  };
  nextNode.data.board = node.data.board.applyMove(move);
}

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
    // <Board pieces={board.pieces} cols={board.width} rows={board.height}/>
    <PlaybackSolution
      solutionPath={solutionPath}
      nodeLookup={nodeLookup}
    />
  );
};

export { Experimenting };
