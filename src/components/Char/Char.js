import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cellSize } from '../../constants/map';
import { moveEnemy, createLvl } from '../../store/actions';
import CharImg from '../../assets/CharImg.svg';

const Char = () => {
  const dispatch = useDispatch();
  const {
    enemyPos,
    map,
    charPos,
    firstMoveComplete,
    lvl
  } = useSelector((state) => state);

  const moveAnimX = useRef(new Animated.Value(charPos.x * cellSize)).current;
  const moveAnimY = useRef(new Animated.Value(charPos.y * cellSize)).current;

  const moveAnim = () => {
    Animated.timing(
      moveAnimX,
      {
        toValue: charPos.x * cellSize,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(
      moveAnimY,
      {
        toValue: charPos.y * cellSize,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      if (/A/.test(map[charPos.y][charPos.x])) {
        dispatch(createLvl(lvl + 1));
      } else if (firstMoveComplete) dispatch(moveEnemy(charPos, enemyPos, map));
    });
  };

  useEffect(() => {
    moveAnim();
  }, [charPos]);

  return (
    <Animated.View style={[style, { transform: [{ translateX: moveAnimX }, { translateY: moveAnimY }] }]}>
      <CharImg height="100%" width="100%" color="white" />
    </Animated.View>
  );
};

const style = {
  position: 'absolute',
  width: cellSize,
  height: cellSize,
  padding: 6
};

export default Char;
