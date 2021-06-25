import React, {useState, useEffect, memo} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

const ActivityIndicatorExample = () => {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#ffffff', padding: 20}}>
        <ActivityIndicator color="#000000" size="large" style />
        <Text>Loading ...</Text>
      </View>
    </View>
  );
};

export default ActivityIndicatorExample;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
