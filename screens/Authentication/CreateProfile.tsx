import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform, Alert, Button, KeyboardAvoidingView, Pressable } from 'react-native';
import { database } from '../../config/firebase';
import { doc, updateDoc, setDoc, collection } from "firebase/firestore";
import  styles  from '../../styles/Authentication/CreateProfile.style';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const includeExtra = true;

export default function CreateProfile({ route, navigation  }) {
    const [username, setUsername] = useState("");
    const [favouriteVerse, setFavouriteVerse] = useState("");
    const [church, setChurch] = useState("");

    const [profilePicture, setProfilePicture] = useState(null);
    
    const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions()
    const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions()

    const [userNameError, setUserNameError] = useState("");
    const [favouriteVerseError, setFavouriteVerseError] = useState("");
    const [churchError, setChurchError] = useState("");


    const validate = () => {
        let isValid = true;
        if (username === "") {
            setUserNameError("Username is required");
            isValid = false;
        } else {
            setUserNameError("");
        }
        if (favouriteVerse === "") {
            setFavouriteVerseError("Favourite Verse is required");
            isValid = false;
        } else {
            setFavouriteVerseError("");
        }
        if (church === "") {
            setChurchError("Church is required");
            isValid = false;
        } else {
            setChurchError("");
        }
        return isValid;
    }

    const pickImage = async () => {
      // ask for permission before going into the image gallery
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // open the image gallery
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };

    const takePhoto =  async () => {
        // ask for permission before accessing the camera to take a photo
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera permissions to make this work!');
            }
        }
        // open the camera
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    }

    const uploadImageAndGetURL = async (uri) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const filename = new Date().getTime() + "-profile-picture.jpg";
        const imageRef = ref(storage, "profile_pictures/" + filename);
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    };
    

    const createProfile = async () => {
      try {
        const profilePictureURL = profilePicture
          ? await uploadImageAndGetURL(profilePicture)
          : null;
    
        const profile = {
          username: username,
          favouriteVerse: favouriteVerse,
          church: church,
          profilePicture: profilePictureURL,
          praises: 0,
          followers: [],
          following: [],
        };
    
        const user = getAuth().currentUser;
        const uid = user.uid;
        const userRef = doc(database, "user", uid);
        await updateDoc(userRef, profile);
        console.log("Document updated with ID: ", uid);
        navigation.navigate("Feeds");
        navigation.reset({
          index: 0,
          routes: [{ name: "Feeds" }],
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };
    

    const showImageOptions = () => {
      Alert.alert(
          "Select a Photo",
          "Choose an option:",
          [
              { text: "Choose from Gallery", onPress: pickImage },
              { text: "Take a Photo", onPress: takePhoto },
              { text: "Cancel", style: "cancel" }
          ]
      );
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.title}>Create Profile</Text>
      <TouchableOpacity style={styles.profileImageSelector} onPress={showImageOptions}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Text style={styles.addProfileImageText}>+</Text>
        )}
      </TouchableOpacity>
      {/* Add other input fields and buttons here */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Church"
        onChangeText={setChurch}
        value={church}
      />
      <TextInput
        style={styles.inputLarge}
        placeholder="Favourite Verse"
        multiline={true}
        numberOfLines={4}
        onChangeText={setFavouriteVerse}
        value={favouriteVerse}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={createProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
  
}
