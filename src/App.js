import './App.css';

import { parseBoard } from './solver/parser';
import { Board } from './Board';

const exampleBoard = `
vb.v
....
.h..
vssv
.ss.
`;

const { pieces, grid } = parseBoard(exampleBoard);

function App() {
  return (
    <div className='App'>
      <header className='app-header'>Setting Sun Solver</header>
      <Board pieces={pieces} cols={4} rows={5}/>
    </div>
  );
}

export default App;
