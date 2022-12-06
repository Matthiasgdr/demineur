export const initPlateArray = (width, height, nbBomb) => {
  let bombIndexes = [];
  let plate = [];
  for (let i = 0; i < nbBomb; i++) {
    let number;
    while (bombIndexes.includes(number)) {
      number = Math.round(Math.random() * (width * height));
    }
    bombIndexes.push(number);
  }
  for (let y = 0; y < width * height; y++) {
    plate.push(
      bombIndexes.includes(y)
        ? { status: "BOMB", discover: false, flagged: false }
        : {
            status: searchNbBombAround(y, bombIndexes, { width, height }),
            discover: false,
            flagged: false,
          }
    );
  }
  return plate;
};

const searchNbBombAround = (index, bombIndexes, { width, height }) => {
  let count = 0;
  const aroundIndexes = getAroundIndexes(index, { width, height });

  aroundIndexes.forEach((i) => {
    if (bombIndexes.includes(i)) count++;
  });

  return count;
};

const inScope = (value, size) => {
  if (value >= 0 && value <= size) {
    return true;
  }
  return false;
};

const isEdge = (index, width) => {
  if (index % width === 0) return "left";
  if (index % width === width - 1) return "right";
  return false;
};

export const getAroundIndexes = (index, { width, height }) => {
  let aroundIndexes = [];
  const size = width * height - 1;
  // Colonne droite
  if (inScope(index + width + 1, size) && isEdge(index, width) !== "right")
    aroundIndexes.push(index + width + 1);
  if (inScope(index - width + 1, size) && isEdge(index, width) !== "right")
    aroundIndexes.push(index - width + 1);
  if (inScope(index + 1, size) && isEdge(index, width) !== "right")
    aroundIndexes.push(index + 1);
  // Colonne gauche
  if (inScope(index - 1, size) && isEdge(index, width) !== "left")
    aroundIndexes.push(index - 1);
  if (inScope(index + width - 1, size) && isEdge(index, width) !== "left")
    aroundIndexes.push(index + width - 1);
  if (inScope(index - width - 1, size) && isEdge(index, width) !== "left")
    aroundIndexes.push(index - width - 1);
  // Colonne milieu
  if (inScope(index + width, size)) aroundIndexes.push(index + width);
  if (inScope(index - width, size)) aroundIndexes.push(index - width);

  return aroundIndexes;
};
