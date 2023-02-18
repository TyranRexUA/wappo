import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Text
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import isMobile from '../../constants/general';

const ModalWindow = ({
  title, children, visible, toggleVisible, style, titleStyle
}) => {
  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    container: {
      width: isMobile ? '100%' : undefined,
      flexShrink: 1,
      backgroundColor: Colors.darker,
      borderColor: 'gray',
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 24,
      borderWidth: 2,
      paddingBottom: 17,
      borderRadius: 10
    },
    title: {
      fontSize: 19,
      lineHeight: 22,
      color: 'white',
      textAlign: 'center',
      marginBottom: 16,
      textTransform: 'uppercase'
    },
  });

  return (visible
    ? (
      <View style={styles.modal} onPress={toggleVisible}>
        <View style={[styles.container, style]}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {children}
        </View>
      </View>
    )
    : null
  );
};

ModalWindow.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.shape({}),
  modalStyle: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};

ModalWindow.defaultProps = {
  visible: false,
  title: undefined,
  style: {},
  modalStyle: {},
  titleStyle: {},
};

export default ModalWindow;
