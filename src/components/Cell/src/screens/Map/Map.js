import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Layout from '../../Layout/Layout';
import Cell from '../../components/Cell/Cell';
import Char from '../../components/Char/Char';
import Enemy from '../../components/Enemy/Enemy';
import Button from '../../components/Button/Button';
import ModalWindow from '../../components/ModalWindows/ModalWindows';
import { createLvl, setModalVisible } from '../../store/actions';
import useSize from '../../utils/useSize';
import { maps, mapSizeInBlocks } from '../../constants/map';

const Map = () => {
  const {
    map, charPos, enemies, lvl, isModalVisible
  } = useSelector((state) => state);
  const { mapSize } = useSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    mapContainer: {
      paddingTop: 10,
      paddingLeft: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      width: mapSize + 10,
      height: mapSize + 10,
      margin: 10,
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      position: 'relative',
    },
    menu: {
      flexGrow: 1,
    },
    modalButton: {
      margin: 10,
      flexShrink: 1,
    }
  });

  const toggleModalVisible = () => {
    dispatch(setModalVisible(false));
  };

  return (
    <Layout
      withHeader
      title={`Level ${lvl}`}
      headerLeft={<Button title="Menu" style={styles.menu} onPress={() => navigate('/Menu')} />}
    >
      <View style={styles.mapContainer}>
        <View style={styles.container}>
          {!!map.length && (
            <>
              {map.map((row, y) => (
                row.map((cell, x) => (
                  <Cell
                    key={`${x}-${y}`}
                    rightBorder={x !== (mapSizeInBlocks - 1) && /L/.test(map[y][x + 1])}
                    topBorder={y !== 0 && /_/.test(map[y - 1][x])}
                    cell={cell}
                    x={x}
                    y={y}
                    charCell={map[charPos.y][charPos.x]}
                  />
                ))
              ))}
              <Char />
              {enemies.map((data) => (
                <Enemy data={data} key={data.id} isLastEnemy={data.id === enemies.length} />
              ))}
            </>
          )}
        </View>
      </View>
      <ModalWindow toggleVisible={toggleModalVisible} title="Congratulation" visible={isModalVisible}>
        {lvl < maps.length && (
          <Button
            style={styles.modalButton}
            title="Next Level"
            onPress={() => {
              dispatch(createLvl(lvl + 1));
              toggleModalVisible();
            }}
          />
        )}
        <Button
          style={styles.modalButton}
          title="Menu"
          onPress={() => {
            navigate('/Menu');
            toggleModalVisible();
          }}
        />
      </ModalWindow>
    </Layout>
  );
};

export default memo(Map);
