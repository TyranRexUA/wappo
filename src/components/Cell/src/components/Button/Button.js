import React, { memo } from 'react';
import {
  StyleSheet, Text, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({
  title, onPress, style, pressedTitleColor, pressedStyle,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexShrink: 1,
      backgroundColor: 'gray',
      borderRadius: 5,
      padding: 10,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressed: {
      opacity: 0.5,
    },
    title: {
      lineHeight: 26,
      fontSize: 24,
      color: 'white'
    },
    pressedTitle: {
      color: pressedTitleColor || undefined
    }
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.container, style, pressed && styles.pressed, pressed && pressedStyle]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={[styles.title, pressed && styles.pressedTitle]}>{title}</Text>
      )}
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  pressedTitleColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  pressedStyle: PropTypes.shape({}),
};

Button.defaultProps = {
  pressedTitleColor: undefined,
  style: {},
  pressedStyle: {}
};

export default memo(Button);
