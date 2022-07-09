import React, {
  memo, useEffect, useRef, useState,
} from 'react';
import {
  Animated, Easing, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { moveEnemy, createLvl, setControlEnabled } from '../../store/actions';
import useSize from '../../utils/useSize';
import EnemyImg from '../../assets/enemy.png';

const Enemy = ({ data, isLastEnemy }) => {
  const { x, y, id } = data;
  const dispatch = useDispatch();
  const [turn, setTurn] = useState(0);
  const { cellSize } = useSize();
  const {
    lvl,
    charPos,
    firstMoveComplete
  } = useSelector((state) => state);

  const moveAnimX = useRef(new Animated.Value(x * cellSize)).current;
  const moveAnimY = useRef(new Animated.Value(y * cellSize)).current;

  const move = () => {
    if (turn === 0) {
      setTurn(1);
      dispatch(moveEnemy(id));
    }
    if (turn === 1) {
      setTurn(0);
      if (isLastEnemy) {
        dispatch(setControlEnabled(true));
      } else {
        dispatch(moveEnemy(id + 1));
      }
    }
  };

  const moveAnim = (isResize) => {
    Animated.timing(
      moveAnimX,
      {
        toValue: x * cellSize,
        duration: isResize ? 0 : 250,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(
      moveAnimY,
      {
        toValue: y * cellSize,
        duration: isResize ? 0 : 250,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      if (firstMoveComplete && !isResize) {
        if (charPos.x === x && charPos.y === y) {
          setTurn(0);
          dispatch(createLvl(lvl));
        } else {
          move();
        }
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: cellSize,
      height: cellSize,
      padding: 6,
    },
    image: {
      width: '100%',
      height: '100%'
    }
  });

  useEffect(() => {
    moveAnim();
  }, [data]);

  useEffect(() => {
    moveAnim(true);
  }, [cellSize]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: moveAnimX }, { translateY: moveAnimY }] }]}>
      <Image source={EnemyImg} style={styles.image} />
    </Animated.View>
  );
};

Enemy.propTypes = {
  isLastEnemy: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired
};

export default memo(Enemy);
