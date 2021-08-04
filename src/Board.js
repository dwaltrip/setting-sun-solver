
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Board };
