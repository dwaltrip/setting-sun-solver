import { useEffect, useState } from 'react';

import './App.css';

import { randomInt } from "./lib/random-int";
import { findShortestPath } from "./solver/graph";
import { parseBoard } from './solver/parser';
import { solveBoard } from './solver/solver';
import { Board } from './Board';

const exampleBoard = `
vb.v
....
.h..
vssv
.ss.
`;

const exampleBoard2 = `
vvs.
...s
h.h.
s.vv
.s..
`;

const exampleBoard3 = `
vh.v
.b..
....
vssv
.ss.
`;

const { startingNode, nodeLookup } = solveBoard(exampleBoard);

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

// let solutionCounter = 0;
// for (let node of Object.values(nodeLookup)) {
//   const board = node.data.board;
//   const pieceMaybe = board.getCoord({ x: 1, y: 3 });
//   if (
//     pieceMaybe &&
//     pieceMaybe.type.name === 'P_2X2_SQUARE' &&
//     pieceMaybe.pos.y === 3 && 
//     pieceMaybe.pos.x === 1
//   ) {
//     console.log('-----------------------------');
//     console.log(board.stringRepr);
//     console.log('-----------------------------');
//     solutionCounter += 1;
//     // break;
//   }
// }
// console.log('solutionCounter:', solutionCounter)


// const { pieces, grid } = parseBoard(exampleBoard);
// solveBoard(exampleBoard2);
// // const { pieces, grid } = parseBoard(exampleBoard2);
// const startingNode = solveBoard(exampleBoard3);
// const { pieces, grid } = parseBoard(exampleBoard3);


const firstNode = nodeLookup[solutionPath.shift()];
function App() {
  const [node, setNode] = useState(firstNode);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      // const edge = node.edges[randomInt(0, node.edges.length - 1)];
      // setNode(edge.to);

      const nextNode = nodeLookup[solutionPath.shift()];
      if (nextNode) {
        setCounter(counter + 1);
        setNode(nextNode);
      }
    }, 850);
    return () => clearInterval(id);
  }, [node]);

  const pieces = node.data.board.pieces;
  return (
    <div className='App'>
      <header className='app-header'>Setting Sun Solver</header>
      <header className='app-header'>Move: {counter}</header>
      <Board pieces={pieces} cols={4} rows={5}/>
    </div>
  );
}

export default App;
