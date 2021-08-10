
function getPieceCoords(piece) {
  const { type, pos } = piece;
  const coords = [];
  for (let dy = 0; dy < type.height; dy++) {
    for (let dx = 0; dx < type.width; dx++) {
      coords.push({ x: pos.x + dx, y: pos.y + dy });
    }
  }
  return coords;
}

export { getPieceCoords };
