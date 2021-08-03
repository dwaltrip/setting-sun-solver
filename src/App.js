import './App.css';

import { parseBoard } from './solver/parser';

const exampleBoard = `
vb.v
....
.h..
vssv
.ss.
`;

const foo = parseBoard(exampleBoard);
console.log(foo);

function App() {
  return (
    <div className='App'>
      Foo Baz
    </div>
  );
}

export default App;
