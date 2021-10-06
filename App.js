import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Linking from 'expo-linking';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [initialTextLat, setInitialTextLat] = useState('');
  const [initialTextLng, setInitialTextLng] = useState('');

  const launchMap = () => {
    const location = `${latitude},${longitude}`;
    const label = `Latitude: ${latitude} and Longitude: ${longitude}`;
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${location}?=`,
      android: `geo:0,0?q=${location}(${label})`,
    });
    Linking.openURL(url);
    setInitialTextLat('');
    setInitialTextLng('');
    console.log(location);
  };

  const ChangeLatText = (text) => {
    setLatitude(text);
    setInitialTextLat(text);
  };

  const ChangeLngText = (text) => {
    setLongitude(text);
    setInitialTextLng(text);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Latitude value:</Text>
        <TextInput
          style={styles.input}
          value={initialTextLat}
          placeholder="Latitude"
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => ChangeLatText(text)}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>Longitude value:</Text>
        <TextInput
          style={styles.input}
          value={initialTextLng}
          placeholder="Longitude"
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => ChangeLngText(text)}
        />
      </View>
      <View>
        <Button title="Launch Map" onPress={launchMap} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
});
