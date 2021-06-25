export const canMove = (cell, cellX, cellY, objPos, objCell, enemyPos) => {
  return !(cellX === enemyPos.x && cellY === enemyPos.y) && (
    (cellX + 1 === objPos.x && cellY === objPos.y && !/L/.test(objCell))
    || (cellX - 1 === objPos.x && cellY === objPos.y && !/L/.test(cell))
    || (cellY - 1 === objPos.y && cellX === objPos.x && !/_/.test(objCell))
    || (cellY + 1 === objPos.y && cellX === objPos.x && !/_/.test(cell))
  );
};

export const moveEnemyToChar = (charPos, enemyPos, map) => {
  let newEnemyX = enemyPos.x;
  let newEnemyY = enemyPos.y;

  if (charPos.y > enemyPos.y && !/_/.test(map[enemyPos.y][enemyPos.x])) {
    newEnemyY += 1;
  } else if (charPos.y < enemyPos.y && !/_/.test(map[enemyPos.y - 1][enemyPos.x])) {
    newEnemyY -= 1;
  } else if (charPos.x > enemyPos.x && !/L/.test(map[enemyPos.y][enemyPos.x + 1])) {
    newEnemyX += 1;
  } else if (charPos.x < enemyPos.x && !/L/.test(map[enemyPos.y][enemyPos.x])) {
    newEnemyX -= 1;
  }

  return { x: newEnemyX, y: newEnemyY };
};
