import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Filter from "bad-words";
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
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { database } from "../config/firebase";
import { unGodlyWords } from "../config/unGodlyWords";

const Comments = ({ postId, postType }) => {
  const navigation = useNavigation();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid; // Get the user's id

  const handlePostComment = async () => {
    const filter = new Filter({ list: unGodlyWords });

    if (commentText === "") {
      alert("Please enter a comment");
      return;
    } else if (commentText.length > 200) {
      alert("Please limit your comment to 200 characters");
      return;
    } else if (filter.isProfane(commentText)) {
      alert("Please refrain from using profanity.");
      return;
    }

    // create a collection of comments for each post. Store the post ID in the comment document, so you can query for all comments for a post
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

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
      userId: user.uid,
      createdAt: serverTimestamp(),
      username,
      userProfilePicture,
      likes: [],
    };

    const commentRef = collection(database, postType, postId, "comments");
    addDoc(commentRef, comment);
    setCommentText("");
  };

  useEffect(() => {
    // Adjust collection path to include postType
    const commentsQuery = query(
      collection(database, postType, postId, "comments")
    );
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    });
    return unsubscribe;
  }, [postId, postType]);

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (comment) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    const commentRef = doc(database, postType, postId, "comments", comment.id);

    // Check if the user has already liked the comment
    const isLiked = comment.likes.includes(uid);

    if (!isLiked) {
      // If the user has not already liked the comment, add their uid to the "likes" array
      await updateDoc(commentRef, {
        likes: arrayUnion(uid),
        likesCount: comment.likes.length + 1,
      });
      // Update the local state
      setComments((prevComments) =>
        prevComments.map((item) =>
          item.id === comment.id
            ? { ...item, likes: [...item.likes, uid] }
            : item
        )
      );
    } else {
      // If the user has already liked the comment, remove their uid from the "likes" array
      await updateDoc(commentRef, {
        likes: arrayRemove(uid),
        likesCount: comment.likes.length - 1,
      });
      // Update the local state
      setComments((prevComments) =>
        prevComments.map((item) =>
          item.id === comment.id
            ? { ...item, likes: item.likes.filter((like) => like !== uid) }
            : item
        )
      );
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
              scrollEnabled
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
    </SafeAreaProvider>
  );
};

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
    fontSize: 16, // add gray background to comment content
  },
  likeSection: {
    flexDirection: "row", // make the likes display inline
    alignItems: "center",
  },
  likesCount: {
    marginLeft: 5, // add a little space between the heart icon and the count
  },
  commentContent: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
});

export default Comments;
