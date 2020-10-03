import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Form = ({search, setSearch, setFetchingInfo}) => {
  const {city, country} = search;
  const [animationBtn] = useState(new Animated.Value(1));

  const animatedIn = () => {
    Animated.spring(animationBtn, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animatedOut = () => {
    Animated.spring(animationBtn, {
      toValue: 1,
      friction: 1, // mientras mas bajo sea el numero mayor es el rebote
      tension: 1, // menos numero mas suave es el movimiento
      useNativeDriver: true,
    }).start();
  };

  //asi pasamos el estilo de la animación
  const animationStyle = {
    transform: [{scale: animationBtn}],
  };

  const searchWeather = () => {
    console.log('aquiii');
    if (city.trim() === '' || country.trim() === '') {
      showAlert();
    }

    setFetchingInfo(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'Add city and country to get the forecast info', [
      {text: 'Got it!'},
    ]);
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={city}
            onChangeText={(city) => setSearch({...search, city})}
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#7e7e7e"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            onValueChange={(country) => setSearch({...search, country})}
            itemStyle={{height: 120, backgroundColor: '#fff'}}>
            <Picker.Item label="Select country" value="" />
            <Picker.Item label="United States" value="US" />
            <Picker.Item label="Spain" value="ES" />
            <Picker.Item label="United Kingdom" value="UK" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Germany" value="DE" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animatedIn()}
          onPressOut={() => animatedOut()}
          onPress={() => searchWeather()}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.textSearch}>Get Forecast</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3f1680',
  },
  btnSearch: {
    marginTop: 30,
    backgroundColor: '#3f1680',
    padding: 10,
    justifyContent: 'center',
  },
  textSearch: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
