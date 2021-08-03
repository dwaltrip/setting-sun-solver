
function forEachPieceCoord(piece, fn) {
  const { type, pos } = piece;
  for (let dy = 0; dy < type.height; dy++) {
    for (let dx = 0; dx < type.width; dx++) {
      fn({ x: pos.x + dx, y: pos.y + dy });
    }
  }
}

export { forEachPieceCoord };
