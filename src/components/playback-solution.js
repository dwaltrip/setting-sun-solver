import { useEffect, useState } from 'react';

import { Board } from './board';

function PlaybackSolution({ nodeLookup, solutionPath }) {
  const [node, setNode] = useState(() => {
    console.log('PlaybackSolution -- initing node state');
    return nodeLookup[solutionPath.shift()];
  });
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
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
    <>
      <header className='app-header'>Move: {counter}</header>
      <Board pieces={pieces} cols={4} rows={5}/>
    </>
  );
}

export { PlaybackSolution }
