import { createMap } from '../constants/map';
import { moveEnemyToChar } from '../utils/random';
import {
  SET_CHAR_POS,
  SET_ENEMY_POS,
  SET_LVL,
  SET_CONTROL_ENABLED
} from './types';

export const setCharPos = (x, y) => ({ type: SET_CHAR_POS, payload: { x, y } });
export const setEnemyPos = (x, y) => ({ type: SET_ENEMY_POS, payload: { x, y } });
export const setControlEnabled = (bool) => ({ type: SET_CONTROL_ENABLED, payload: bool });
export const setLvl = (lvl) => ({ type: SET_LVL, payload: createMap(lvl) });

export const createLvl = (lvl) => {
  return (dispatch) => {
    dispatch(setLvl(lvl));
    setTimeout(() => {
      dispatch(setControlEnabled(true));
    }, 200);
  };
};

export const moveEnemy = (charPos, enemyPos, map) => {
  return (dispatch) => {
    const newEnemyPos = moveEnemyToChar(charPos, enemyPos, map);
    dispatch(setEnemyPos(newEnemyPos.x, newEnemyPos.y));
  };
};
