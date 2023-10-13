import React, { useState, useEffect, useRef} from 'react';
import {StyleSheet ,Text, View, TouchableOpacity, Pressable, SafeAreaView, Modal, ScrollView, FlatList, Dimensions, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { Header as HeaderRNE } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { database } from '../config/firebase';
import { addDoc, collection, doc, setDoc, getDoc, serverTimestamp, query, orderBy, getDocs, limit, startAfter, onSnapshot, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import RNPickerSelect from "react-native-picker-select";
import uuid from 'react-native-uuid';

function Header({navigation}) {
  return (
    <HeaderRNE
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      }
      centerComponent={{ text: 'Create a Question', style: { color: 'black', fontSize: 24 } }}
      containerStyle={{
        backgroundColor: 'white',
        justifyContent: 'space-around',
        height: 120,
        paddingTop: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'lightgrey'
      }}
    />
  );
}

function QuestionPost({navigation}) {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [type, setType] = useState('public');
  const [loading, setLoading] = useState(false);
  

  // TODO: create a firebase document for the current users questions
  // - the document should have the following fields
    // - question
    // - userId
    // - createdAt
    // - subcollection of comments
    // - post id
    // - praises
    // - praises count
    // - profile picture
    // - username
// TODO: create a form to post a question
 // The form should allow for anonymous posting so that signed in users can post anonymously
  // an anonymous post will hide the user's profile picture and username
// 

  const postQuestion = async () => {
    if (Title === "" || Content === "" || type === "") {
      Alert.alert('Error', 'Please enter a title and question', [{
        text: 'OK',
      }]);
      return;
    } else if (Title.length > 40) {
      Alert.alert('Error', 'Title must be less than 40 characters', [{
        text: 'OK',
      }]);
      return;
    }

    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;

      const userDoc = await getDoc(doc(database, 'user', uid));
        if (!userDoc.exists()) {
            console.error('User not found in database');
            return;
        }

        const username = userDoc.data().username;
        const userProfilePicture = userDoc.data().profilePicture;

        const postData = {
          Title,
          Content,
          type,
          uid,
          username,
          userProfilePicture,
          praises: [],
          praisesCount: 0,
          createdAt: serverTimestamp(),
          QuestionId: uuid.v4(),
        };

        const QuestionCollection = collection(database, 'questions');
        const QuestionDoc = doc(QuestionCollection, postData.QuestionId);
        await setDoc(QuestionDoc, postData);

        Alert.alert('Success', 'Your question has been posted', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
    }
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  }
    

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardAvoidingView}
      >
        <Header navigation={navigation}/>
        <TextInput
          placeholder="Title of Question"
          style={styles.TitleInput}
          onChangeText={setTitle}
          value={Title}
        />
        <TextInput
          placeholder="Ask your question...?"
          style={styles.input}
          onChangeText={setContent}
          value={Content}
          multiline={true}
        />
        <RNPickerSelect
          onValueChange={setType}
          items={[
              { label: 'Public', value: 'public' },
              { label: 'Anonymous', value: 'anonymous' },
          ]}
          placeholder={{
            label: "Select a post type...",
            value: null,
          }}
          style={pickerSelectStyles}
          value={type}
        />
        <TouchableOpacity style={styles.buttonContainer}
          onPress={postQuestion}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  TitleInput: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },
input: {
    height: 100,
    width: '100%',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
},
  buttonContainer: {
    marginTop: 40,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      marginTop: 20,
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      marginTop: 20,
  },
});

export default QuestionPost