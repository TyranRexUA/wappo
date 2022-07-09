import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Layout from '../../Layout/Layout';
import { createLvl } from '../../store/actions';
import isMobile from '../../constants/general';
import { maps } from '../../constants/map';

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const maxCompletedLvl = useSelector((state) => state.maxCompletedLvl, shallowEqual);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.darker,
    },
    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingBottom: (isMobile || height >= 400) ? 0 : 100,
    },
    button: {
      margin: 20,
      width: 400,
      minWidth: '40%',
      maxWidth: '80%',
      minHeight: 100,
      flexGrow: 1,
    }
  });

  const goToLevel = (id) => {
    dispatch(createLvl(id));
    navigate('/Map');
  };

  const completedLevels = useMemo(() => {
    const lvls = [];
    for (let i = 0; i <= Math.min(maxCompletedLvl, maps.length - 1); i += 1) {
      lvls.push(i);
    }
    return lvls;
  }, [maxCompletedLvl]);

  return (
    <Layout
      withHeader
      title="Select Level"
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {completedLevels.map((item) => (
          <Button key={item} style={styles.button} title={String(item + 1)} onPress={() => goToLevel(item + 1)} />
        ))}
      </ScrollView>
    </Layout>

  );
};

export default memo(Menu);
