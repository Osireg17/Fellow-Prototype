import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

// import Comments from "../../../components/Comments";
import { database } from "../../../config/firebase";

export default function Page() {
  const { id: postId } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const publicPostDoc = await getDoc(doc(database, "public", postId));
      if (publicPostDoc.exists()) {
        setPost(publicPostDoc.data());
        return;
      }

      const privatePostDoc = await getDoc(doc(database, "private", postId));
      if (privatePostDoc.exists()) {
        setPost(privatePostDoc.data());
      }
    };

    fetchPost();
  }, []);

  if (!post) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.postTitle}>{post.Title}</Text>
            <View style={styles.postUser}>
              <Text style={styles.postUsername}>{post.username}</Text>
              <Image
                source={{
                  uri:
                    post.userProfilePicture || "https://via.placeholder.com/40",
                }}
                style={styles.postUserImage}
              />
            </View>
          </View>
          <View style={styles.postBibleInformation}>
            {post.BibleInformation.map((verse, index) => (
              <View key={index}>
                <RenderHTML
                  contentWidth={200}
                  source={{ html: verse.BibleText }}
                />
                <Text
                  style={styles.postBibleReference}
                >{`${verse.BibleBook} ${verse.BibleChapter}:${verse.BibleVerse}`}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.postUserOpinion}>{post.Content}</Text>
        </View>
        {/* <Comments postId={postId} postType={post.postType} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
  postContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  postUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  postUserOpinion: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  postBibleInformation: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginBottom: 10,
  },
  postBibleText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  postBibleReference: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    marginBottom: 5,
  },
});
