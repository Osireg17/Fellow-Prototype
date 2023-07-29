import {Text, View, TouchableOpacity, Image, FlatList, Dimensions, Alert, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, onSnapshot, collection, where, query, getDocs, deleteDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "../config/firebase";
import { useState, useEffect } from "react";
import { FontAwesome, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header as HeaderRNE } from 'react-native-elements';



const EditPostPage = ({navigation,route}) => {
    const {id, postType} = route.params;
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');

    console.log(id);

    useEffect(() => {
      const fetchPost = async () => {
          try {
              const postDoc = await getDoc(doc(database, postType, id));
              if (postDoc.exists()) {
                  setTitle(postDoc.data().Title);
                  setContent(postDoc.data().Content);
              } else {
                  console.log("No such document!");
              }
          } catch (error) {
              console.log('Error getting document:', error);
          }
      }

      fetchPost();
  }, [id, postType]);

    
  const updatePost = async () => {
    try {
        await updateDoc(doc(database, postType, id), {
            Title: Title,
            Content: Content,
        });
    } catch (error) {
        console.log('Error updating document:', error);
    }
    navigation.goBack();
}
    
    
return (
  <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.keyboardAvoidingView}
      >
          <HeaderRNE
              leftComponent={
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
              }
              centerComponent={{ text: 'Edit Post', style: { color: 'black', fontSize: 24 } }}
              containerStyle={{
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  height: 120,
                  paddingTop: 0,
                  borderBottomWidth: 0,
                  borderBottomColor: 'lightgrey'
              }}
          />
          <TextInput
              style={styles.TitleInput}
              onChangeText={setTitle}
              value={Title}
              placeholder="Enter a title for your post..."
          />
          <TextInput
              style={styles.input}
              onChangeText={setContent}
              value={Content}
              placeholder="Enter the content of your post..."
              multiline={true}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={updatePost}>
              <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
  </SafeAreaView>
)
}

export default EditPostPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 20,
  },
  TitleInput: {
    height: 50,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#282C35',
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    height: 200,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#282C35',
    fontSize: 18,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#282C35',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
