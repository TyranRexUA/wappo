import React, { memo } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { batch, useDispatch, useSelector } from 'react-redux';
import { cellSize } from '../../constants/map';
import { setCharPos, setControlEnabled } from '../../store/actions';
import { canMove } from '../../utils/random';

const Cell = ({
  cell, x, y, charCell, topBorder, rightBorder
}) => {
  const dispatch = useDispatch();
  const { charPos, isControlEnabled, enemyPos } = useSelector((state) => state);

  const style = StyleSheet.create({
    cell: {
      width: cellSize,
      height: cellSize,
      backgroundColor: /A/.test(cell) ? 'green' : 'gray',
      opacity: !isControlEnabled || !canMove(cell, x, y, charPos, charCell, enemyPos) ? 0.5 : 1,
      borderWidth: 3,

      borderBottomColor: /_/.test(cell) ? 'red' : 'gray',
      borderTopColor: topBorder ? 'red' : 'gray',

      borderLeftColor: /L/.test(cell) ? 'red' : 'gray',
      borderRightColor: rightBorder ? 'red' : 'gray',

    },
  });

  const move = () => {
    if (canMove(cell, x, y, charPos, charCell, enemyPos)) {
      batch(() => {
        dispatch(setControlEnabled(false));
        dispatch(setCharPos(x, y));
      });
    }
  };

  if (!isControlEnabled || !canMove(cell, x, y, charPos, charCell, enemyPos)) {
    return (
      <View style={style.cell} />
    );
  }

  return (
    <TouchableHighlight style={style.cell} onPress={move}>
      <View />
    </TouchableHighlight>
  );
};

Cell.propTypes = {
  cell: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  charCell: PropTypes.string.isRequired,
  topBorder: PropTypes.bool.isRequired,
  rightBorder: PropTypes.bool.isRequired,
};

export default memo(Cell);
