import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

const Layout = ({
  children, title, headerLeft, headerRight, withHeader
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 60,
      flexDirection: 'row',
    },
    title: {
      fontSize: 24,
      color: 'white',
      textAlign: 'center',
    },
    headerLeftContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    headerTitleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headerRightContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end'
    }
  });

  return (
    <View style={styles.container}>
      {withHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeftContainer}>
            {headerLeft || <View />}
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.headerRightContainer}>
            {headerRight || <View />}
          </View>
        </View>
      )}
      {children}
    </View>
  );
};

Layout.propTypes = {
  withHeader: PropTypes.bool,
  title: PropTypes.string,
  headerLeft: PropTypes.node,
  headerRight: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  withHeader: false,
  title: '',
  headerLeft: undefined,
  headerRight: undefined,
};

export default memo(Layout);
