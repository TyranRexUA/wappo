import { Dimensions } from 'react-native';

export const mapWidth = 6;
export const cellSize = Dimensions.get('window').width / mapWidth;

export const createMap = (lvl) => {
  switch (lvl) {
    case 1:
      return {
        lvl,
        map: [
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', 'A', '', '_L', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
        ],
        charPos: { x: 0, y: 0 },
        enemyPos: { x: 5, y: 5 }
      };
    case 2:
      return {
        lvl,
        map: [
          ['', '', '', '', '', ''],
          ['', '', 'A', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
        ],
        charPos: { x: 0, y: 0 },
        enemyPos: { x: 3, y: 3 }
      };
    default:
      return [];
  }
};
