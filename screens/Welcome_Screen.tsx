import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import styles from '../styles/Welcome_Screen.style'

const bgImage = require('../photos/LandingScreen.jpg');

export default function Welcome_Screen({navigation}) {
  return (
      <ImageBackground source={bgImage} style={styles.imageBackground}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Fellow</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}


