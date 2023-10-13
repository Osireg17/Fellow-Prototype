import { Ionicons } from "@expo/vector-icons";
import Filter from "bad-words";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

import { database } from "../config/firebase";
import { unGodlyWords } from "../config/unGodlyWords";
import {
  styles,
  pickerSelectStyles,
} from "../styles/Components/BiblePost.style";

function Header({ navigation }) {
  return (
    <HeaderRNE
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      }
      centerComponent={{
        text: "Create a Revelation",
        style: { color: "black", fontSize: 24 },
      }}
      containerStyle={{
        backgroundColor: "white",
        justifyContent: "space-around",
        height: 120,
        paddingTop: 0,
        borderBottomWidth: 0,
        borderBottomColor: "lightgrey",
      }}
    />
  );
}

function BiblePost({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const { selectedVerses } = route.params;
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [postType, setPostType] = useState("");

  const filter = new Filter({ list: unGodlyWords });

  const goodWords = ["God"];
  filter.removeWords(...goodWords);

  // write a function that ensure the user content does not go over 400 characters

  const postOpinion = async () => {
    if (Content === "" || postType === "") {
      Alert.alert(
        "Missing information",
        "Please fill out all fields.",
        [{ text: "OK" }],
        { cancelable: false },
      );
      return;
    }

    if (filter.isProfane(Content) || filter.isProfane(Title)) {
      Alert.alert(
        "Profanity detected",
        "Please remove any profanity from your opinion.",
        [{ text: "OK" }],
        { cancelable: false },
      );
      // console.log the bad words
      console.log(filter.clean(Content));
      return;
    }

    if (Title.length > 30) {
      Alert.alert(
        "Title is too long",
        "Please shorten the title to 30 characters or less.",
        [{ text: "OK" }],
        { cancelable: false },
      );
      return;
    }

    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;

      // Get the user's profile from Firestore
      const userDoc = await getDoc(doc(database, "user", uid));
      if (!userDoc.exists()) {
        console.error("User not found in database");
        return;
      }

      const username = userDoc.data().username;
      const userProfilePicture = userDoc.data().profilePicture;

      const postData = {
        Title,
        Content,
        postType,
        BibleInformation: selectedVerses.map((verse) => ({
          BibleBook: verse.book,
          BibleChapter: verse.chapter,
          BibleVerse: verse.verse,
          BibleText: verse.text,
        })),
        createdAt: serverTimestamp(),
        uid,
        praises: [],
        // comments as a subcollection
        postId: uuid.v4(),
        username,
        userProfilePicture,
      };

      const collectionPath = postType === "public" ? "public" : "private";
      const postCollection = collection(database, collectionPath);
      const postDoc = doc(postCollection, postData.postId);

      await setDoc(postDoc, postData);

      Alert.alert(
        "Success!",
        "Your opinion has been posted.",
        [{ text: "OK", onPress: () => navigation.goBack() }],
        { cancelable: false },
      );
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Header navigation={navigation} />
        {selectedVerses &&
          selectedVerses.map((verse, index) => (
            <View key={index} style={styles.verseContainer}>
              <RenderHTML
                contentWidth={windowWidth}
                source={{ html: '"' + verse.text + '"' }}
              />
              <Text style={styles.reference}>
                {verse.book + " " + verse.chapter + ":" + verse.verse}
              </Text>
            </View>
          ))}
        <TextInput
          style={styles.TitleInput}
          onChangeText={setTitle}
          value={Title}
          placeholder="Enter a title for your opinion..."
          // hide the keyboard when the user presses enter
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          onChangeText={setContent}
          value={Content}
          placeholder="Enter your opinion on the verse..."
          multiline
          // if the user presses outside of the text input, hide the keyboard
          onBlur={Keyboard.dismiss}
        />
        <RNPickerSelect
          onValueChange={(value) => setPostType(value)}
          items={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
          placeholder={{
            label: "Select a post type...",
            value: null,
          }}
          style={pickerSelectStyles}
          value={postType}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={postOpinion}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default BiblePost;
