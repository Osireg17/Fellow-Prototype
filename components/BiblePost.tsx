import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { database } from '../config/firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import RNPickerSelect from "react-native-picker-select";
import { Header as HeaderRNE } from 'react-native-elements';
import Filter from 'bad-words';
import { styles, pickerSelectStyles } from '../styles/Components/BiblePost.style';
import { unGodlyWords } from '../config/unGodlyWords';
import RenderHTML from 'react-native-render-html';
import { postOpinion } from './utils/BiblePost';


import uuid from 'react-native-uuid';

function Header({ navigation }) {
    return (
        <HeaderRNE
            leftComponent={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            }
            centerComponent={{ text: 'Create a Revelation', style: { color: 'black', fontSize: 24 } }}
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


function BiblePost({ route, navigation }) {

    const windowWidth = useWindowDimensions().width;
    const { selectedVerses } = route.params;
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [postType, setPostType] = useState("");


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <Header navigation={navigation} />
                {
                    selectedVerses && selectedVerses.map((verse, index) => (
                        <View key={index} style={styles.verseContainer}>
                            <RenderHTML contentWidth={windowWidth} source={{ html: '"' + verse.text + '"' }} />
                            <Text style={styles.reference}>{verse.book + " " + verse.chapter + ":" + verse.verse}</Text>
                        </View>
                    ))
                }
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
                    multiline={true}
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
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { postOpinion(Title, Content, postType, selectedVerses, navigation); }}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default BiblePost;