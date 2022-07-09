import React, { memo } from 'react';
import {
  StyleSheet, View, TouchableHighlight, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { batch, useDispatch, useSelector } from 'react-redux';
import useSize from '../../utils/useSize';
import { setCharPos, setControlEnabled } from '../../store/actions';
import { canMove } from '../../utils/general';
import isMobile from '../../constants/general';
import HomeImg from '../../assets/home.png';

const Cell = ({
  cell, x, y, charCell, topBorder, rightBorder
}) => {
  const dispatch = useDispatch();
  const { charPos, isControlEnabled, enemies } = useSelector((state) => state);
  const { cellSize } = useSize();

  const styles = StyleSheet.create({
    cell: {
      width: cellSize,
      height: cellSize,
      backgroundColor: 'gray',
      opacity: !isControlEnabled || !canMove(cell, x, y, charPos, charCell, enemies) ? 0.5 : 1,
      position: 'relative',
      ...(isMobile && {
        borderWidth: 3,
        borderBottomColor: /_/.test(cell) ? 'red' : 'gray',
        borderTopColor: topBorder ? 'red' : 'gray',
        borderLeftColor: /L/.test(cell) ? 'red' : 'gray',
        borderRightColor: rightBorder ? 'red' : 'gray'
      })
    },
    buttonContent: {
      height: '100%',
      width: '100%',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    ...(!isMobile && {
      topLine: {
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 3,
        backgroundColor: topBorder ? 'red' : 'gray',
      },
      bottomLine: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: 3,
        backgroundColor: /_/.test(cell) ? 'red' : 'gray',
      },
      leftLine: {
        position: 'absolute',
        height: '100%',
        left: 0,
        width: 3,
        backgroundColor: /L/.test(cell) ? 'red' : 'gray',
      },
      rightLine: {
        position: 'absolute',
        height: '100%',
        right: 0,
        width: 3,
        backgroundColor: rightBorder ? 'red' : 'gray',
      }
    })
  });

  const move = () => {
    if (canMove(cell, x, y, charPos, charCell, enemies)) {
      batch(() => {
        dispatch(setControlEnabled(false));
        dispatch(setCharPos(x, y));
      });
    }
  };

  if (!isControlEnabled || !canMove(cell, x, y, charPos, charCell, enemies)) {
    return (
      <View style={styles.cell}>
        {!isMobile && (
          <>
            <View style={styles.topLine} />
            <View style={styles.bottomLine} />
            <View style={styles.leftLine} />
            <View style={styles.rightLine} />
          </>
        )}
        {/A/.test(cell) && <Image source={HomeImg} style={styles.image} />}
      </View>
    );
  }

  return (
    <TouchableHighlight style={styles.cell} onPress={move}>
      <View style={styles.buttonContent}>
        {!isMobile && (
          <>
            <View style={styles.topLine} />
            <View style={styles.bottomLine} />
            <View style={styles.leftLine} />
            <View style={styles.rightLine} />
          </>
        )}
        {/A/.test(cell) && <Image source={HomeImg} style={styles.image} />}
      </View>
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
