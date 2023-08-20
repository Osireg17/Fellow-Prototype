import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/Welcome_Screen.style'
// import { Button, Text } from 'react-native-paper';
import {View, TextField, Text, Button} from 'react-native-ui-lib';

const bgImage = require('../photos/LandingScreen.jpg');


export default function Welcome_Screen({ navigation }) {

  return (
    <ImageBackground source={bgImage} style={styles.imageBackground}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Fellow</Text>
        <Button style={styles.button} label="Login"
          onPress={() => navigation.navigate('Login')}
        />
        <Button style={styles.button} label="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </ImageBackground>
  );
}


