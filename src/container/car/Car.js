import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  Alert,
  Keyboard,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';

// components
import ListCar from './ListCar';
import TextInput from './../../components/TextInput';
import Background from './../../components/Background';
// utils
import {getAll, save, edit, deleted} from './../../database/controllers/Cars';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const Car = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [date, setDate] = useState('');
  const [idEdit, setIdEdit] = useState(null);
  const [cars, setCars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getAll();
      setCars(data);
    }

    fetchData();
  }, []);

  async function addData() {
    try {
      if (make === '' || model === '') {
        Alert.alert('Data tidak boleh kosong');
        return;
      }

      const data = {make: make, model: model};
      await save(data);

      setMake('');
      setModel('');
      Keyboard.dismiss();
      onRefresh();
    } catch (error) {
      Alert.alert('Error Network Add Data');
    }
  }

  function getData(data) {
    setMake(data.make);
    setModel(data.model);
    setDate(data.createdDate);
    setIdEdit(data.id);
    console.log(data);
  }

  function onCancel() {
    setMake('');
    setModel('');
    setIdEdit(false);
  }

  async function updateData() {
    if (idEdit === null) {
      Alert.alert('Klick tombol edit di list data untuk merubah data');
    }

    const response = {
      id: idEdit,
      make: make,
      model: model,
      createdDate: date,
      updatedDate: new Date(),
    };

    const result = await edit(response, cars);

    setCars(result);
    setMake('');
    setModel('');
    setIdEdit(null);
    Keyboard.dismiss();
  }

  async function deleteData(data) {
    const result = await deleted(data);
    setCars(result);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background>
        <View style={{marginVertical: 20}}>
          <Text>TES OFFLINE DATABASE WITH REALM</Text>
        </View>

        <TextInput
          label="Make"
          returnKeyType="next"
          value={make}
          onChangeText={text => setMake(text)}
        />

        <TextInput
          label="Model"
          returnKeyType="done"
          value={model}
          onChangeText={text => setModel(text)}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-around',
          }}>
          {!idEdit ? (
            <TouchableHighlight style={styles.button} onPress={addData}>
              <Text>SAVE</Text>
            </TouchableHighlight>
          ) : (
            <>
              <TouchableHighlight style={styles.button} onPress={onCancel}>
                <Text>CANCEL</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.button} onPress={updateData}>
                <Text>EDIT</Text>
              </TouchableHighlight>
            </>
          )}
        </View>

        <FlatList
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <ListCar data={item} edit={getData} delet={deleteData} />
          )}
        />
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#D8D3D2',
  },
});

export default Car;
