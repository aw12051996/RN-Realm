import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const ListCar = ({data, edit, delet}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        marginVertical: 10,
      }}>
      <Text>{`${data.make} ${data.model}`}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          edit(data);
        }}>
        <Text>UPDATE</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          delet(data);
        }}>
        <Text>DELETE</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#D8D3D2',
  },
});

export default ListCar;
