import React, {memo, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native';
import {theme} from './../utils/theme';
import {Picker} from '@react-native-community/picker';

const TextInput = ({errorText, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', color: theme.colors.secondary}}>
        {props.label}
      </Text>
      <View
        style={[styles.containerInput, props.error && {borderColor: 'red'}]}>
        <Picker
          style={[styles.input, !props?.value && {color: '#A4B0BE'}]}
          selectedValue={props?.selectedValue}
          {...props}>
          <Picker.Item value="" label={props?.placeholder} color="#A4B0BE" />
          {props?.options &&
            props?.options.map((item, index) => (
              <Picker.Item
                key={index}
                label={item?.name}
                value={item?.id}
                color="#000000"
              />
            ))}
        </Picker>
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 44,
    fontSize: 16,
    paddingHorizontal: 10,
    flex: 1,
    // color: '#A4B0BE',
  },
  containerInput: {
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: '#d7d7d7',
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingTop: 4,
  },
});

export default memo(TextInput);
