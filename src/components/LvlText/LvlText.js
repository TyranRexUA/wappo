import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

const LvlText = () => {
  const lvl = useSelector((state) => state.lvl);

  return (
    <Text style={style}>
      {`LEVEL ${lvl}`}
    </Text>
  );
};

const style = {
  marginTop: 20,
  color: 'white',
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  width: '100%',
};

export default LvlText;
