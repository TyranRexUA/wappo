import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { mapWidth } from '../../constants/map';
import { createLvl } from '../../store/actions';
import Cell from '../Cell/Cell';
import Char from '../Char/Char';
import Enemy from '../Enemy/Enemy';

const Map = () => {
  const dispatch = useDispatch();
  const { map, charPos } = useSelector((state) => state);

  useEffect(() => {
    dispatch(createLvl(1));
  }, []);

  return (
    <View style={style}>
      {!!map.length && (
        <>
          {map.map((row, y) => (
            row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                rightBorder={x !== ( mapWidth - 1) && /L/.test(map[y][x + 1])}
                topBorder={y !== 0 && /_/.test(map[y - 1][x])}
                cell={cell}
                x={x}
                y={y}
                charCell={map[charPos.y][charPos.x]}
              />
            ))
          ))}

          <Char />
          <Enemy />
        </>
      )}
    </View>
  );
};

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  position: 'relative'
};

export default Map;
