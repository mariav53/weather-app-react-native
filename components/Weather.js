import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const Weather = ({forecastResult, search, goBack}) => {
  const {main, name} = forecastResult;
  const {city, country} = search;

  if (!name || !city || !country) return null;
  const kelvin = 273.15;

  return (
    <>
      <View>
        <View>
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.btnBack}>
              <Text style={styles.textBackh}>Go back</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.weather}>
          <Text style={styles.title}>
            {city} - {country}
          </Text>
          <Text style={[styles.text, styles.current]}>
            {parseInt(main.temp - kelvin)}
            <Text style={styles.temp}>&#x2103;</Text>
            <Image
              source={{
                uri: `http://openweathermap.org/img/w/${forecastResult.weather[0].icon}.png`,
              }}
              style={{width: 66, height: 58}}
            />
          </Text>
          <View style={styles.temps}>
            <Text style={styles.text}>
              Min {''}
              <Text style={styles.temp}>
                {parseInt(main.temp_min - kelvin)}&#x2103;
              </Text>
            </Text>
            <Text style={styles.text}>
              Max {''}
              <Text style={styles.temp}>
                {parseInt(main.temp_max - kelvin)}&#x2103;
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wether: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temps: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Weather;
