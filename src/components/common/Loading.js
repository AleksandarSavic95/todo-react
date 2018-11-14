import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/**
 * When a component does not require state or lifecycle methods,
 * make it a functional component by declaring it with const ...
 */
const Loading = ({ size }) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size}/>
    </View>
  );
};

const styles = {
  spinnerContainer: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
};

export { Loading };