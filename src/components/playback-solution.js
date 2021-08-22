import { useEffect, useState } from 'react';

import { buildSafeSetState } from '../lib/build-safe-set-state';
import { Board } from './board';

// TODO: "pause" playback when any of the other controls are pressed 
// e.g. When "Forward" is clicked, the auto playback should pause.
function PlaybackSolution({ nodeLookup, solutionPath }) {
  const lastMoveIndex = solutionPath.length - 1;

  const [isPlaying, setIsPlaying] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);

  const setMoveIndexSafely = buildSafeSetState({
    isValid: val => (0 <= val) && (val <= lastMoveIndex),
    setState: setMoveIndex,
  });

  const increaseMoveIndexBy10 = () => {
    setMoveIndexSafely(prev => Math.min(prev + 10, lastMoveIndex));
  };
  const decreaseMoveIndexBy10 = () => {
    setMoveIndexSafely(prev => Math.max(0, prev - 10));
  };

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
          onClick={() => setMoveIndexSafely(0)}
          disabled={moveIndex <= 0}
        >
          Jump to first
        </button>
        <button onClick={decreaseMoveIndexBy10} disabled={moveIndex <= 0}>
          Back++
        </button>
        <button
          onClick={() => setMoveIndexSafely(prev => prev - 1)}
          disabled={moveIndex <= 0}
        >
          Back
        </button>
        <button
          onClick={() => setMoveIndexSafely(prev => prev + 1)}
          disabled={moveIndex >= lastMoveIndex}
        >
          Forward
        </button>
        <button
          onClick={increaseMoveIndexBy10}
          disabled={moveIndex >= lastMoveIndex}
        >
          Forward++
        </button>
        <button
          onClick={() => setMoveIndexSafely(lastMoveIndex)}
          disabled={moveIndex >= lastMoveIndex}
        >
          Jump to end
        </button>
      </div>
      <Board pieces={pieces} cols={4} rows={5}/>
    </>
  );
}

export { PlaybackSolution }
