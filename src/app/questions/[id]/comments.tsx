import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  addDoc,
  increment,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { database } from "@/config/firebase";

export default function Page() {
  const { id: postId } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user!.uid; // Get the user's id

  const handlePostComment = async () => {
    // create a collection of comments for each post. Store the post ID in the comment document, so you can query for all comments for a post

    const userDoc = await getDoc(doc(database, "user", uid));
    if (!userDoc.exists()) {
      console.error("User not found in database");
      return;
    }

    const username = userDoc.data().username;
    const userProfilePicture = userDoc.data().profilePicture;

    const comment = {
      text: commentText,
      postId,
      userId: uid,
      createdAt: serverTimestamp(),
      username,
      userProfilePicture,
      likes: [],
      likesCount: 0,
    };

    const commentRef = collection(database, "questions", postId, "comments");
    addDoc(commentRef, comment);
    setCommentText("");
  };

  useEffect(() => {
    const commentsQuery = query(
      collection(database, "questions", postId, "comments")
    );
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    });
    return unsubscribe;
  }, [postId]);

  const handleLike = async (comment) => {
    const commentRef = doc(
      database,
      "questions",
      postId,
      "comments",
      comment.id
    );

    const isLiked = comment.likes.includes(uid);

    if (!isLiked) {
      await updateDoc(commentRef, {
        likes: arrayUnion(uid),
        likesCount: increment(1),
      }).then(() => {
        setComments((prevComments) =>
          prevComments.map((item) => {
            return item.id === comment.id
              ? { ...item, likes: [...item.likes, uid] }
              : item;
          })
        );
      });
    } else {
      await updateDoc(commentRef, {
        likes: arrayRemove(uid),
        likesCount: increment(-1),
      }).then(() => {
        setComments((prevComments) =>
          prevComments.map((item) => {
            return item.id === comment.id
              ? { ...item, likes: item.likes.filter((like) => like !== uid) }
              : item;
          })
        );
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={handlePostComment}>
              <Ionicons name="send" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentHeader}>
                <Image
                  source={{
                    uri:
                      comment.userProfilePicture ||
                      "https://via.placeholder.com/30",
                  }}
                  style={styles.commentUserImage}
                />
                <Text style={styles.commentUsername}>{comment.username}</Text>
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
              <View style={styles.likeSection}>
                <TouchableOpacity onPress={() => handleLike(comment)}>
                  <Ionicons
                    name={
                      comment.likes.includes(uid) ? "heart" : "heart-outline"
                    }
                    size={24}
                    color={comment.likes.includes(uid) ? "red" : "black"}
                  />
                </TouchableOpacity>
                <Text style={styles.likesCount}>{comment.likes.length}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f1f1f1",
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 35,
  },
  comment: {
    marginTop: 5,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  commentUsername: {
    fontSize: 14,
  },
  commentText: {
    marginTop: 5,
    fontSize: 16,
  },
  likeSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    marginLeft: 5,
  },
  commentContent: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
});
