import './App.css';

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


solveBoard(exampleBoard);
const { pieces, grid } = parseBoard(exampleBoard);

// solveBoard(exampleBoard2);
// const { pieces, grid } = parseBoard(exampleBoard2);

function App() {
  return (
    <div className='App'>
      <header className='app-header'>Setting Sun Solver</header>
      <Board pieces={pieces} cols={4} rows={5}/>
    </div>
  );
}

export default App;
