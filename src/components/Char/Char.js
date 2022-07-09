import React, { memo, useEffect, useRef } from 'react';
import {
  Animated, Easing, Image, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { moveEnemy, setCompletedLvl, setModalVisible } from '../../store/actions';
import useSize from '../../utils/useSize';
import CharImg from '../../assets/char.png';

const Char = () => {
  const dispatch = useDispatch();
  const { cellSize } = useSize();
  const {
    lvl,
    map,
    charPos,
    firstMoveComplete,
  } = useSelector((state) => state);

  const moveAnimX = useRef(new Animated.Value(charPos.x * cellSize)).current;
  const moveAnimY = useRef(new Animated.Value(charPos.y * cellSize)).current;

  const moveAnim = (isResize) => {
    Animated.timing(
      moveAnimX,
      {
        toValue: charPos.x * cellSize,
        duration: isResize ? 0 : 250,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(
      moveAnimY,
      {
        toValue: charPos.y * cellSize,
        duration: isResize ? 0 : 250,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      if (!isResize) {
        if (/A/.test(map[charPos.y][charPos.x])) {
          dispatch(setModalVisible(true));
          AsyncStorage.getItem('maxCompletedLvl').then((maxCompletedLvl) => {
            if (lvl > (parseInt(maxCompletedLvl || 0))) {
              AsyncStorage.setItem('maxCompletedLvl', String(lvl));
            }
            dispatch(setCompletedLvl(lvl));
          });
        } else if (firstMoveComplete) {
          dispatch(moveEnemy(1));
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
  }, [charPos]);

  useEffect(() => {
    moveAnim(true);
  }, [cellSize]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: moveAnimX }, { translateY: moveAnimY }] }]}>
      <Image source={CharImg} style={styles.image} />
    </Animated.View>
  );
};

export default memo(Char);
