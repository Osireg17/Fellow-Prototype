import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {styles} from '../../styles/Authentication/SignUp.style';

export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [allFieldsEmpty, setAllFieldsEmpty] = useState(false);
    const [passwordComplexityError, setPasswordComplexityError] = useState(false);

    const passwordComplexityCheck = (password: string) => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      return regex.test(password);
    };


    const validateFields = () => {
      let isValid = true;
  
      if (name === "") {
        setNameError(true);
        isValid = false;
      } else {
        setNameError(false);
      }
  
      if (email === "") {
        setEmailError(true);
        isValid = false;
      } else {
        setEmailError(false);
      }
  
      if (password === "") {
        setPasswordError(true);
        isValid = false;
      } else {
        setPasswordError(false);
      }
  
      if (confirmPassword === "") {
        setConfirmPasswordError(true);
        isValid = false;
      } else {
        setConfirmPasswordError(false);
      }
      
      if (password !== confirmPassword) {
        setPasswordMismatch(true);
        isValid = false;
      } else {
        setPasswordMismatch(false);
      }
      if (name === "" && email === "" && password === "" && confirmPassword === "") {
        setAllFieldsEmpty(true);
        isValid = false;
      } else {
        setAllFieldsEmpty(false);
      }

      if (!passwordComplexityCheck(password)) {
        setPasswordComplexityError(true);
        isValid = false;
      } else {
        setPasswordComplexityError(false);
      }
  
      return isValid;
    };



    const onHandleSignUp = () => {
      if (validateFields()) {
        navigation.navigate("CreateProfile", {
          name,
          email,
          password,
        });
      }
    };
    

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.signUpWrapper}>
              <Text style={styles.signUpTitle}>Sign Up</Text>
              <TextInput
                style={[styles.input, nameError ? styles.errorInput : null]}
                placeholder="Name"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => setName(text)}
                value={name}
              />
              {nameError && <Text style={styles.errorText}>Please enter your name.</Text>}
              <TextInput
                style={[styles.input, emailError ? styles.errorInput : null]}
                placeholder="Email Address"
                placeholderTextColor="#B0B0B0"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              {emailError && <Text style={styles.errorText}>Please enter your email.</Text>}
              <TextInput
                style={[styles.input, passwordError || passwordMismatch ? styles.errorInput : null]}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#B0B0B0"
              />
              {passwordError && <Text style={styles.errorText}>Please enter a password.</Text>}
              <TextInput
                style={[styles.input, confirmPasswordError || passwordMismatch ? styles.errorInput : null]}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                placeholderTextColor="#B0B0B0"
              />
              {confirmPasswordError && <Text style={styles.errorText}>Please confirm your password.</Text>}
              {passwordMismatch && (
                <Text style={styles.errorText}>Passwords do not match.</Text>
              )}
              {allFieldsEmpty && (
                <Text style={styles.errorText}>Please fill in all the fields.</Text>
              )}
              {passwordComplexityError && (
                <Text style={styles.errorText}>
                  Password must be at least 8 characters long and contain numbers and special characters.
                </Text>
              )}
              <TouchableOpacity style={styles.signUpButton} onPress={onHandleSignUp}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.registerTextContainer}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.registerText}>Log into your account </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}
