import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cellSize } from '../../constants/map';
import { moveEnemy, createLvl, setControlEnabled } from '../../store/actions';
import EnemyImg from '../../assets/EnemyImg.svg';

const Enemy = () => {
  const dispatch = useDispatch();
  const [turn, setTurn] = useState(0);
  const {
    lvl,
    map,
    enemyPos,
    charPos,
    firstMoveComplete
  } = useSelector((state) => state);

  const moveAnimX = useRef(new Animated.Value(enemyPos.x * cellSize)).current;
  const moveAnimY = useRef(new Animated.Value(enemyPos.y * cellSize)).current;

  const move = () => {
    if (turn === 0) {
      setTurn(1);
      dispatch(moveEnemy(charPos, enemyPos, map));
    }
    if (turn === 1) {
      setTurn(0);
      dispatch(setControlEnabled(true));
    }
  };

  const moveAnim = () => {
    Animated.timing(
      moveAnimX,
      {
        toValue: enemyPos.x * cellSize,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(
      moveAnimY,
      {
        toValue: enemyPos.y * cellSize,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      if (firstMoveComplete) {
        if (charPos.x === enemyPos.x && charPos.y === enemyPos.y) {
          setTurn(0);
          dispatch(createLvl(lvl));
        } else {
          move();
        }
      }
    });
  };

  useEffect(() => {
    moveAnim();
  }, [enemyPos]);

  return (
    <Animated.View style={[style, { transform: [{ translateX: moveAnimX }, { translateY: moveAnimY }] }]}>
      <EnemyImg height="100%" width="100%" color="white" />
    </Animated.View>
  );
};

const style = {
  position: 'absolute',
  width: cellSize,
  height: cellSize,
  padding: 6,
};

export default Enemy;
