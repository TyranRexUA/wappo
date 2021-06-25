/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import LvlText from './src/components/LvlText/LvlText';
import Map from './src/components/Map/Map';
import store from './src/store/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const style = {
    height: '100%',
    backgroundColor: isDarkMode ? Colors.lighter : Colors.darker,
    justifyContent: 'center'
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ backgroundColor: isDarkMode ? Colors.lighter : Colors.darker, }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <LvlText />
        <View style={style}>
          <Map />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
