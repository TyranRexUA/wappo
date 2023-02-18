export const canMove = (cell, cellX, cellY, objPos, objCell, enemies) => {
  return !(enemies.some(({ x, y }) => x === cellX && y === cellY)) && (
    (cellX + 1 === objPos.x && cellY === objPos.y && !/L/.test(objCell))
    || (cellX - 1 === objPos.x && cellY === objPos.y && !/L/.test(cell))
    || (cellY - 1 === objPos.y && cellX === objPos.x && !/_/.test(objCell))
    || (cellY + 1 === objPos.y && cellX === objPos.x && !/_/.test(cell))
  );
};

export const moveEnemyToChar = (charPos, enemyId, enemies, map) => {
  const enemyPos = { ...enemies.find(({ id }) => id === enemyId) };
  let newEnemyX = enemyPos.x;
  let newEnemyY = enemyPos.y;

  if (charPos.y > enemyPos.y && !/_/.test(map[enemyPos.y][enemyPos.x])
    && !enemies.some(({ x, y }) => x === enemyPos.x && y === enemyPos.y + 1)) {
    newEnemyY += 1;
  } else if (charPos.y < enemyPos.y && !/_/.test(map[enemyPos.y - 1][enemyPos.x])
    && !enemies.some(({ x, y }) => x === enemyPos.x && y === enemyPos.y - 1)) {
    newEnemyY -= 1;
  } else if (charPos.x > enemyPos.x && !/L/.test(map[enemyPos.y][enemyPos.x + 1])
    && !enemies.some(({ x, y }) => x === enemyPos.x + 1 && y === enemyPos.y)) {
    newEnemyX += 1;
  } else if (charPos.x < enemyPos.x && !/L/.test(map[enemyPos.y][enemyPos.x])
    && !enemies.some(({ x, y }) => x === enemyPos.x - 1 && y === enemyPos.y)) {
    newEnemyX -= 1;
  }

  const newEnemies = enemies.map((enemy) => (
    enemy.id === enemyId ? { ...enemyPos, x: newEnemyX, y: newEnemyY } : enemy
  ));
  return newEnemies;
};
