import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { doc, getDoc, collection, getDocs, onSnapshot, query, updateDoc, arrayUnion, arrayRemove, where, orderBy, serverTimestamp, setDoc} from "firebase/firestore";
import { database } from '../config/firebase';
import { getAuth } from "firebase/auth";
import uuid from 'react-native-uuid';

const RepostPage = ({navigation,route}) => {
    const {postId, post} = route.params;
    console.log(post);
    const [Content, setContent] = useState("");
    const [postType, setPostType] = useState("");

    const postRepost = async () => {

    const auth = getAuth();
    const uid = auth.currentUser.uid;

    const userDoc = await getDoc(doc(database, 'user', uid));
        if (!userDoc.exists()) {
            console.error('User not found in database');
            return;
        }

        const username = userDoc.data().username;
        const userProfilePicture = userDoc.data().profilePicture;

    const repostData = {
        repostContent: Content,
        Content: post.Content,
        postType: post.postType,
        repostType: postType,
        repostId: uuid.v4(),
        createdAt: serverTimestamp(),
        BibleInformation: post.BibleInformation,
        uid: uid,
        praises: [],

    }

    // add users repost to the the respective post collection
    const collectionPath = postType  === "public" ? "public" : "private";
    const postCollection = collection(database, collectionPath);
    const postDoc = doc(postCollection, repostData.repostId);

    await setDoc(postDoc, repostData);

    alert("Repost successful");
    navigation.goBack();

    }




  return (
    <View>
      <Text>RepostPage</Text>
    </View>
  )
}

export default RepostPage

const styles = StyleSheet.create({})