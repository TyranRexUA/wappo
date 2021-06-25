import { mapWidth } from '../constants/map';

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const createChance = () => {
  return Math.floor(Math.random() * (101))
}

export const randomFrom = (arr) => {
 return arr[Math.floor(Math.random()*arr.length)]
}

export const createPath = (map) => {
  let x = Math.floor(mapWidth / 2), y = 0;
  map[y][x].type = 'empty'

  while (y < map.length - 1) {
    const chance = createChance()

    if (chance <= 40 && y < map.length - 1) {
      y += 1
    }
    if (chance > 40 && chance <= 65 && x !== mapWidth - 1) {
      x += 1
    }
    if (chance > 65 && chance <= 90 && x !== 0) {
      x -= 1
    }
    if (chance > 90 && y !== 0) {
      y -= 1
    }

    map[y][x].type = 'empty'
  }
}

export const mapGenerator = () => {
  const map = []
  const mapHeight = randomInteger(20, 25)
  for (let i = 0; i < mapHeight; i++) {

    const row = []
    for (let i = 0; i < mapWidth; i++) {
      row.push({
        type: 'wall' // randomFrom(cellTypes)
      })
    }

    map.push(row)
  }
  createPath(map)

  return map;
}