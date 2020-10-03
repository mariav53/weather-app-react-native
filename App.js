import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ImageBackground,
} from 'react-native';

import Form from './components/Form';
import Weather from './components/Weather';
const App = () => {
  const [search, setSearch] = useState({city: '', cuntry: ''});
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [forecastResult, setForecastResult] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');
  const [bgimage, setBgimage] = useState(
    require('./android/assets/img/bg.jpg'),
  );

  const {city, country} = search;

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const fetchForecast = async () => {
      if (fetchingInfo) {
        const apiKey = 'a5fd7590764801ebfe6038b693b3b0a7';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          console.log('resut', result);
          setForecastResult(result);
          setFetchingInfo(false);

          //modificar color de fondo basado en temp
          const kelvin = 273.15;
          const {main} = result;
          const current = main.temp - kelvin;

          if (current < 10) {
            setBgimage(require('./android/assets/img/cold_2.jpg'));
          } else if (current >= 10 && current < 16) {
            setBgimage(require('./android/assets/img/cold_1.jpg'));
          } else {
            setBgimage(require('./android/assets/img/hot_1.jpg'));
          }
        } catch (error) {
          showAlert();
        }
      }
    };
    fetchForecast();
  }, [fetchingInfo]);

  const goBack = () => {
    setBgimage(require('./android/assets/img/bg.jpg'));
    setForecastResult({});
  };

  const showAlert = () => {
    Alert.alert('Error', 'No results. Try another city or country', [
      {text: 'Got it!'},
    ]);
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app]}>
          <ImageBackground source={bgimage} style={styles.image}>
            <View style={styles.content}>
              {Object.keys(forecastResult).length === 0 ? (
                <Form
                  search={search}
                  setSearch={setSearch}
                  setFetchingInfo={setFetchingInfo}
                />
              ) : (
                <Weather
                  forecastResult={forecastResult}
                  search={search}
                  goBack={goBack}
                />
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  content: {
    marginHorizontal: '2.5%',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});

export default App;
