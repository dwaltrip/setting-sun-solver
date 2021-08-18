import { useEffect, useState } from 'react';

import { buildSafeSetState } from '../lib/build-safe-set-state';
import { Board } from './board';

function PlaybackSolution({ nodeLookup, solutionPath }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);

  const setMoveIndexSafely = buildSafeSetState({
    isValid: val => (0 <= val) && (val <= (solutionPath.length - 1)),
    setState: setMoveIndex,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setMoveIndexSafely(moveIndex + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying, moveIndex]);

  const node = nodeLookup[solutionPath[moveIndex]];
  const pieces = node.data.board.pieces;

  return (
    <>
      <header className='app-header'>Move: {moveIndex}</header>
      <div className='playback-controls'>
        <button onClick={()=> setIsPlaying(!isPlaying)} >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => setMoveIndexSafely(prev => prev - 1)}
          disabled={moveIndex <= 0}
        >
          Back
        </button>
        <button
          onClick={() => setMoveIndexSafely(prev => prev + 1)}
          disabled={moveIndex >= (solutionPath.length - 1)}
        >
          Forward
        </button>
      </div>
      <Board pieces={pieces} cols={4} rows={5}/>
    </>
  );
}

export { PlaybackSolution }
