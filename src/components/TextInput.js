import React, {memo, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput as Input,
  TouchableOpacity,
} from 'react-native';
import {theme} from './../utils/theme';

const TextInput = ({errorText, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={[
          styles.containerInput,
          props.error && {borderColor: theme.colors.primary},
        ]}>
        {props?.afix && (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!props?.afixAction}
            onPress={props?.afixAction}
            style={{paddingLeft: 10}}>
            {props?.afix}
          </TouchableOpacity>
        )}
        <Input
          placeholderTextColor="#A4B0BE"
          style={[styles.input]}
          {...props}
        />
        {props?.sufix && (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!props?.sufixAction}
            onPress={props?.sufixAction}
            style={{paddingRight: 10}}>
            {props?.sufix}
          </TouchableOpacity>
        )}
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
  label: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
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
