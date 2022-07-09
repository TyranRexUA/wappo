import {
  SET_CHAR_POS,
  SET_LVL,
  SET_CONTROL_ENABLED,
  SET_ENEMIES,
  SET_MODAL_VISIBLE,
  SET_COMPLETED_LVL
} from './types';

const initialState = {
  lvl: 1,
  map: [],
  charPos: {
    x: 0,
    y: 0
  },
  enemies: [],
  isControlEnabled: true,
  firstMoveComplete: false,
  isModalVisible: false,
  maxCompletedLvl: 0,
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAR_POS:
      return {
        ...state,
        charPos: action.payload,
        firstMoveComplete: true,
      };
    case SET_ENEMIES:
      return {
        ...state,
        enemies: action.enemies,
      };
    case SET_LVL:
      return {
        ...state,
        ...action.payload,
        isControlEnabled: false,
        firstMoveComplete: false,
      };
    case SET_COMPLETED_LVL:
      return {
        ...state,
        maxCompletedLvl: action.payload,
      };
    case SET_CONTROL_ENABLED:
      return {
        ...state,
        isControlEnabled: action.payload
      };
    case SET_MODAL_VISIBLE:
      return {
        ...state,
        isModalVisible: action.isModalVisible
      };
    default:
      return state;
  }
};

export default map;
