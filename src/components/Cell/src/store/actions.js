import { maps } from '../constants/map';
import { moveEnemyToChar } from '../utils/general';
import {
  SET_CHAR_POS,
  SET_LVL,
  SET_CONTROL_ENABLED,
  SET_ENEMIES,
  SET_MODAL_VISIBLE,
  SET_COMPLETED_LVL
} from './types';

export const setCharPos = (x, y) => ({ type: SET_CHAR_POS, payload: { x, y } });
export const setEnemiesPos = (enemies) => ({ type: SET_ENEMIES, enemies });
export const setControlEnabled = (bool) => ({ type: SET_CONTROL_ENABLED, payload: bool });
export const setLvl = (lvl) => ({ type: SET_LVL, payload: maps[lvl - 1] });
export const setCompletedLvl = (lvl) => ({ type: SET_COMPLETED_LVL, payload: lvl });
export const setModalVisible = (isModalVisible) => ({ type: SET_MODAL_VISIBLE, isModalVisible });

export const createLvl = (lvl) => {
  return (dispatch) => {
    dispatch(setLvl(lvl));
    setTimeout(() => {
      dispatch(setControlEnabled(true));
    }, 200);
  };
};

export const moveEnemy = (enemyId) => {
  return (dispatch, getState) => {
    const { charPos, map, enemies } = getState();
    const newEnemies = moveEnemyToChar(charPos, enemyId, enemies, map);
    dispatch(setEnemiesPos(newEnemies));
  };
};
