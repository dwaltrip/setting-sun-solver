import {
  P_1X1_SQUARE,
  P_2X1_HORIZ,
  P_2X1_VERT,
  P_2X2_SQUARE,
} from "../solver/symbols";

// TODO: Come up with some abstraction for this?
// How should it work for other puzzles besides the setting sun?
const BGColors = {
  [P_1X1_SQUARE]: 'green',
  [P_2X1_HORIZ]: 'white',
  [P_2X1_VERT]: 'white',
  [P_2X2_SQUARE]: 'red',
};

const UNIT_SIZE = 60;
const MARGIN = 15;

function gridDimensionToPx(distance) {
  return (
    (distance * UNIT_SIZE) +
    ((distance - 1) * MARGIN)
  );
}

function gridPosToPx(pos) {
  return (
    (pos * UNIT_SIZE) +
    (pos * MARGIN)
  );
}

function Board({ pieces, rows, cols }) {
  const boardHeight = gridDimensionToPx(rows);
  const boardWidth = gridDimensionToPx(cols);
  return (
    <div 
      className='board'
      style={{
        height: `${boardHeight}px`,
        width: `${boardWidth}px`,
        padding: `${MARGIN}px`,
      }}
    >
      <div className='pieces-wrap'>
        {pieces.map((piece, index) => {
          const { type, pos } = piece;
          const y =  gridPosToPx(pos.y);
          const x = gridPosToPx(pos.x);
          const height = gridDimensionToPx(type.height);
          const width = gridDimensionToPx(type.width);
          return (
            <div
              className='piece'
              style={{
                top: `${y}px`,
                left: `${x}px`,
                height: `${height}px`,
                width: `${width}px`,
              }}
              key={`${type.name} -- ${index}`}
            >
              <div
                className='bg-color'
                style={{
                  height: `${0.8 * UNIT_SIZE}px`,
                  width: `${0.8 * UNIT_SIZE}px`,
                  backgroundColor: BGColors[type.name],
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Board };
