import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  arrayRemove,
  updateDoc,
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Card } from "react-native-ui-lib";

import { database } from "../../config/firebase";
import styles from "../../styles/Feeds/Questions.style";

type UID = string;
type PictureURL = string;
type Question = any; // replace any with the type definition for a Question
type Navigation = any; // replace any with the type definition for Navigation
type Post = any;

async function fetchProfilePicture(uid: UID): Promise<PictureURL> {
  try {
    const userDocRef = doc(database, "user", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().profilePicture;
    } else {
      console.log("No such document!");
      return "";
    }
  } catch (error) {
    console.log("Error fetching user's profile picture:", error);
    return "";
  }
}

function QuestionHeader({
  navigation: Navigation,
}: {
  navigation: Navigation;
}) {
  const [profilePicture, setProfilePicture] = useState("");

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (uid) {
      fetchProfilePicture(uid).then((pictureUrl) => {
        console.log("Profile picture URL:", pictureUrl);
        setProfilePicture(pictureUrl);
      });
    }
  }, [uid]);

  const NavigateToProfile = () => {
    //complete the function to navigate to the profile page
    Navigation.navigate("Profile");
  };
  return (
    <>
      <HeaderRNE
        centerComponent={{
          text: "Questions",
          style: styles.centerComponent,
        }}
        rightComponent={
          <View style={styles.rightComponent}>
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={NavigateToProfile}
            >
              <Image
                source={{
                  uri: profilePicture || "https://via.placeholder.com/40",
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        }
        containerStyle={styles.headerContainer}
      />
    </>
  );
}

export default function Questions({
  navigation: Navigation,
}: {
  navigation: Navigation;
}) {
  const [questions, setQuestions] = useState([]);
  const [showFullTitle, setShowFullTitle] = useState(false);

  const toggleTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const questionsCollection = collection(database, "questions");

    const unsubscribe = onSnapshot(questionsCollection, (querySnapshot) => {
      const fetchedQuestions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(fetchedQuestions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const NavigateToPostQuestion = () => {
    Navigation.navigate("QuestionPost");
  };

  const PostStats = ({ post, uid }: { post: Post; uid: UID }) => {
    const [praises, setPraises] = useState(post.praises || []);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(post.comments || []);

    const fetchComments = async () => {
      // Get a reference to the comments subcollection
      const commentsRef = collection(
        database,
        "questions",
        post.id,
        "comments",
      );

      // Fetch the comments
      const querySnapshot = await getDocs(commentsRef);

      // Update the state with the new comments
      setComments(querySnapshot.docs.map((doc) => doc.data()));
    };

    const handleLikePress = async () => {
      if (!liked) {
        await updateDoc(doc(database, "questions", post.id), {
          praises: arrayUnion(uid),
          praisesCount: (post.praises || []).length + 1,
        });
        setPraises([...(post.praises || []), uid]);
        setLiked(true);
      } else {
        await updateDoc(doc(database, "questions", post.id), {
          praises: arrayRemove(uid),
          praisesCount: (post.praises || []).length - 1,
        });
        setPraises((post.praises || []).filter((praise) => praise !== uid));
        setLiked(false);
      }
    };

    useEffect(() => {
      fetchComments();

      setLiked((post.praises || []).includes(uid));
      setPraises(post.praises || []);
    }, [post]);

    const onCommentClick = () => {
      Navigation.navigate("QuestionCommentsPage", {
        post,
        uid,
        postId: post.id,
      });
    };

    return (
      <View style={styles.postFooterIcons}>
        <TouchableOpacity
          onPress={handleLikePress}
          style={styles.postFooterIcon}
        >
          <View style={styles.iconWithCount}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "red" : "black"}
            />
            <Text>{praises.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postFooterIcon}
          onPress={onCommentClick}
        >
          <View style={styles.iconWithCount}>
            <AntDesign name="message1" size={24} color="black" />
            <Text
              style={{
                marginLeft: 5,
              }}
            >
              {comments.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const navigateToOtherProfile = (post: Post, uid: UID) => {
    if (post.type === "public") {
      if (post.uid === uid) {
        Navigation.navigate("Profile");
      } else {
        Navigation.navigate("OtherUserProfilePage", { uid: post.uid });
      }
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#FBF8F8" }}>
      <QuestionHeader navigation={Navigation} />
      <View style={[styles.scene, { backgroundColor: "#FBF8F8" }]}>
        <FlatList
          data={questions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const createdAt = item.createdAt
              ? item.createdAt.toDate().toLocaleString()
              : "";
            return (
              <Card key={index} containerStyle={styles.postContainer}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={toggleTitle}>
                    <Text
                      style={styles.postTitle}
                      numberOfLines={showFullTitle ? undefined : 1}
                      ellipsizeMode="tail"
                    >
                      {showFullTitle || item.Title.length <= 30
                        ? item.Title
                        : `${item.Title.substring(0, 20)}...`}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.postUser}>
                    <TouchableOpacity
                      onPress={() => navigateToOtherProfile(item, uid)}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.type === "public" ? (
                          <>
                            <Text style={styles.postUsername}>
                              {item.username}
                            </Text>
                            <Image
                              source={{
                                uri:
                                  item.userProfilePicture ||
                                  "https://via.placeholder.com/40",
                              }}
                              style={styles.postUserImage}
                            />
                          </>
                        ) : (
                          <FontAwesome5
                            name="theater-masks"
                            size={24}
                            color="black"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.postUserOpinion}>{item.Content}</Text>
                <View style={styles.postFooter}>
                  <Text style={styles.postTimestamp}>{createdAt}</Text>
                  <PostStats post={item} uid={uid} />
                </View>
              </Card>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.fab} onPress={NavigateToPostQuestion}>
        <Ionicons name="md-create" size={25} color="white" />
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}
