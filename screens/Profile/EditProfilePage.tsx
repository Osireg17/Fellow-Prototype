import { Text, View, TextInput, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, ActionSheetIOS } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Profile/EditProfilePage.style';
import { Header as HeaderRNE, Avatar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { database } from '../../config/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';


function ProfileHeader({ navigation }) {
    return (
        <HeaderRNE
            centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontSize: 20, fontWeight: 'bold' } }}
            containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'space-around',
            }}
        />
    );
}

function EditProfile({ navigation }) {
    const [editUsername, setEditUsername] = useState('');
    const [editChurch, setEditChurch] = useState('');
    const [editFavouriteVerse, setEditFavouriteVerse] = useState("");
    const [editProfilePicture, setEditProfilePicture] = useState("");

    const convertToBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    }

    const handleImageSelection = async (result) => {
        if (!result.canceled) {
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            const storage = getStorage();
            const filename = new Date().getTime() + "-profile-picture.jpg";
            const imageRef = ref(storage, "profile_pictures/" + filename);
            const firstAsset = result.assets[0].uri; // accessing the first selected asset
            const blob = await convertToBlob(firstAsset);
            await uploadBytes(imageRef, blob);
            const url = await getDownloadURL(imageRef);
            setEditProfilePicture(url);
        }
    };

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }

            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraStatus !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }

        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["Cancel", "Choose From Gallery", "Take Photo"],
                    cancelButtonIndex: 0,
                },
                async (buttonIndex) => {
                    switch (buttonIndex) {
                        case 1:
                            let result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [4, 3],
                                quality: 1,
                            });
                            await handleImageSelection(result);
                            break;
                        case 2:
                            let photo = await ImagePicker.launchCameraAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [4, 3],
                                quality: 1,
                            });
                            await handleImageSelection(photo);
                            break;
                    }
                }
            );
        } else {
            Alert.alert("Upload Photo", "Choose From Gallery or Take a Photo", [
                {
                    text: "Choose From Gallery",
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            quality: 1,
                        });
                        await handleImageSelection(result);
                    },
                },
                {
                    text: "Take Photo",
                    onPress: async () => {
                        let photo = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            quality: 1,
                        });
                        await handleImageSelection(photo);
                    },
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ]);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            const userDocRef = doc(database, 'user', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setEditUsername(userData.username);
                setEditChurch(userData.church);
                setEditFavouriteVerse(userData.favouriteVerse);
                setEditProfilePicture(userData.profilePicture);
            }
        };

        fetchUserData();
    }, []);

    const editProfile = async () => {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const userDocRef = doc(database, 'user', userId);
        await updateDoc(userDocRef, {
            username: editUsername,
            church: editChurch,
            favouriteVerse: editFavouriteVerse,
            profilePicture: editProfilePicture,
        });
        Alert.alert('Profile Updated!');
        navigation.navigate('Profile');
    }
    // Your render return statement would be here

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Avatar
                rounded
                size={120}
                source={{ uri: editProfilePicture || 'https://via.placeholder.com/200' }}
                containerStyle={styles.avatar}
            />
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Change Profile Picture</Text>
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.valueInput}
                        placeholder="Username"
                        onChangeText={setEditUsername}
                        value={editUsername}
                    />
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.label}>Favorite Verse:</Text>
                    <TextInput
                        style={styles.TextInputLarge}
                        placeholder="Favorite Verse"
                        onChangeText={setEditFavouriteVerse}
                        value={editFavouriteVerse}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Church:</Text>
                    <TextInput
                        style={styles.valueInput}
                        placeholder="Church"
                        onChangeText={setEditChurch}
                        value={editChurch}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={editProfile} style={styles.button}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}


export default function EditProfilePage({ navigation }) {
    return (
        <SafeAreaProvider>
            <ProfileHeader navigation={navigation} />
            <EditProfile navigation={navigation} />
        </SafeAreaProvider>
    )
}
