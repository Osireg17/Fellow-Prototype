import { useLocalSearchParams, useRouter } from "expo-router";
import {
  doc,
  getDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

import { database } from "@/config/firebase";
import { useAuth } from "@/context/auth";

export default function Page() {
  const { id: postId } = useLocalSearchParams<{
    id: string;
    postType: string;
  }>();
  const { user } = useAuth();
  const router = useRouter();
  const uid = user!.uid;
  console.log(postId);

  const [Content, setContent] = useState("");
  const [postType, setPostType] = useState("");

  //   const postRepost = async () => {
  //     const userDoc = await getDoc(doc(database, "user", uid));
  //     if (!userDoc.exists()) {
  //       console.error("User not found in database");
  //       return;
  //     }

  //     const username = userDoc.data().username;
  //     const userProfilePicture = userDoc.data().profilePicture;

  //     const repostData = {
  //       repostContent: Content,
  //       Content: post.Content,
  //       postType: post.postType,
  //       repostType: postType,
  //       repostId: uuid.v4(),
  //       createdAt: serverTimestamp(),
  //       BibleInformation: post.BibleInformation,
  //       uid,
  //       praises: [],
  //     };

  //     // add users repost to the the respective post collection
  //     const collectionPath = postType === "public" ? "public" : "private";
  //     const postCollection = collection(database, collectionPath);
  //     const postDoc = doc(postCollection, repostData.repostId);

  //     await setDoc(postDoc, repostData);

  //     alert("Repost successful");
  //     router.back();
  //   };

  return (
    <SafeAreaView>
      <Text>RepostPage</Text>
    </SafeAreaView>
  );
}
