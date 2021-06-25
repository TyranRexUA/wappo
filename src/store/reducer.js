import {
  SET_CHAR_POS,
  SET_ENEMY_POS,
  SET_LVL,
  SET_CONTROL_ENABLED
} from './types';

const initialState = {
  lvl: 1,
  map: [],
  charPos: {
    x: 0,
    y: 0
  },
  enemyPos: {
    x: 5,
    y: 5
  },
  isControlEnabled: true,
  firstMoveComplete: false,
  enemyStep: 0
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAR_POS:
      return {
        ...state,
        charPos: action.payload,
        firstMoveComplete: true,
      };
    case SET_ENEMY_POS:
      return {
        ...state,
        enemyPos: action.payload,
      };
    case SET_LVL:
      return {
        ...state,
        ...action.payload,
        isControlEnabled: false,
        firstMoveComplete: false,
      };
    case SET_CONTROL_ENABLED:
      return {
        ...state,
        isControlEnabled: action.payload
      };
    default:
      return state;
  }
};

export default map;
