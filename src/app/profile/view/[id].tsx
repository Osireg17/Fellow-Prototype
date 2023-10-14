import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Avatar, Header as HeaderRNE } from "react-native-elements";
import { TabView, TabBar } from "react-native-tab-view";

import { database } from "../../../config/firebase";
import styles from "../../../styles/Profile/OtherUserProfilePage.style";

import { useAuth } from "@/context/auth";

function Header() {
  const router = useRouter();
  return (
    <HeaderRNE
      leftComponent={
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      }
      centerComponent={{
        text: `${username}`,
        style: { color: "black", fontSize: 24 },
      }}
      containerStyle={{
        backgroundColor: "white",
        justifyContent: "space-around",
        height: 120,
        paddingTop: 0,
        borderBottomWidth: 0,
        borderBottomColor: "lightgrey",
        marginTop: -30,
      }}
    />
  );
}

function OtherUserProfile() {
  const { user } = useAuth();
  const { uid } = route.params;
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [praises, setPraises] = useState([]);
  const [favoriteVerse, setFavoriteVerse] = useState("");
  const [church, setChurch] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleConnect = async () => {
    const currentUserUid = user!.uid;

    const userDocRef = doc(database, "user", uid);
    const currentUserDocRef = doc(database, "user", currentUserUid);

    console.log(`Connect state before operation: ${isFollowing}`);
    console.log(`Current user ID: ${currentUserUid}`);
    console.log(`Other user ID: ${uid}`);

    if (isFollowing) {
      console.log("Attempting to disconnect...");
      await updateDoc(userDocRef, {
        followers: arrayRemove(currentUserUid),
      });
      await updateDoc(currentUserDocRef, {
        following: arrayRemove(uid),
      });
      setIsFollowing(false);
    } else {
      console.log("Attempting to connect...");
      await updateDoc(userDocRef, {
        followers: arrayUnion(currentUserUid),
      });
      await updateDoc(currentUserDocRef, {
        following: arrayUnion(uid),
      });
      setIsFollowing(true);
    }

    console.log(`Connect state after operation: ${isFollowing}`);
  };

  useEffect(() => {
    const userDocRef = doc(database, "user", uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (userDocSnap) => {
        if (userDocSnap.exists()) {
          setUsername(userDocSnap.data().username);
          setFollowers(userDocSnap.data().followers);
          setFollowing(userDocSnap.data().following);
          setPraises(userDocSnap.data().totalPraises);
          setFavoriteVerse(userDocSnap.data().favouriteVerse);
          setChurch(userDocSnap.data().church);
          setProfilePic(userDocSnap.data().profilePicture);

          // Check if the current user is already connected to the viewed user
          const currentUserUid = user!.uid;
          if (userDocSnap.data().followers.includes(currentUserUid)) {
            setIsFollowing(true);
          }
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error fetching user's profile picture:", error);
      }
    );

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [isFollowing]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Header username={username} />
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size={100}
            source={{ uri: profilePic || "https://via.placeholder.com/200" }}
            containerStyle={styles.avatar}
          />
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Followers</Text>
              <Text style={styles.statValue}>{followers.length}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Following</Text>
              <Text style={styles.statValue}>{following.length}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Praises</Text>
              <Text style={styles.statValue}>{praises ?? 0}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.label}>Favourite Verse:</Text>
            <Text style={styles.value}>{favoriteVerse}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.label}>Church:</Text>
            <Text style={styles.value}>{church}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={isFollowing ? styles.unfollowButton : styles.followButton}
            onPress={handleConnect}
          >
            <Text style={styles.buttonText}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const PublicPostsRoute = () => {
  const { user } = useAuth();
  const uid = user!.uid;
  const router = useRouter();
  const [publicPosts, setPublicPosts] = useState([]);
  const otherUserUid = uid;

  useEffect(() => {
    const fetchPosts = async () => {
      const publicCollection = collection(database, "public");
      const publicQuery = query(
        publicCollection,
        where("uid", "==", otherUserUid)
      );
      const publicDocs = await getDocs(publicQuery);

      const allPublicPosts = [];
      publicDocs.forEach((doc) => {
        allPublicPosts.push({ ...doc.data(), id: doc.id });
      });

      setPublicPosts(allPublicPosts);
    };

    fetchPosts();
  }, []);

  return (
    <FlatList
      data={publicPosts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const createdAt = item.createdAt
          ? item.createdAt.toDate().toLocaleString()
          : "";
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <Link
                  href={
                    item.uid === otherUserUid
                      ? "/profile"
                      : `/profile/view/${item.uid}`
                  }
                  asChild
                >
                  <TouchableOpacity>
                    <Text style={styles.postUsername}>{item.username}</Text>
                  </TouchableOpacity>
                </Link>
                <Link
                  href={
                    item.uid === otherUserUid
                      ? "/profile"
                      : `/profile/view/${item.uid}`
                  }
                  asChild
                >
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri:
                          item.userProfilePicture ||
                          "https://via.placeholder.com/40",
                      }}
                      style={styles.postUserImage}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
            {item.BibleInformation.map((info, infoIndex) => {
              return (
                <View key={infoIndex} style={styles.postBibleInformation}>
                  <Text style={styles.postBibleReference}>
                    {info.BibleBook} {info.BibleChapter}:{info.BibleVerse}
                  </Text>
                  <Text style={styles.postBibleText}>"{info.BibleText}"</Text>
                </View>
              );
            })}
            <Text style={styles.postUserOpinion}>{item.Content}</Text>
            <Text style={styles.postTimestamp}>{createdAt}</Text>
            <View style={styles.postFooter}>
              <View style={styles.praiseContainer}>
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.praiseCount}>
                  {item.praises ? item.praises.length : 0}
                </Text>
              </View>
              <Link href={`/comments/${item.id}`} asChild>
                <TouchableOpacity style={styles.commentButton}>
                  <AntDesign name="message1" size={24} color="black" />
                  <Text style={styles.commentCount}>
                    {item.comments ? item.comments.length : 0}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        );
      }}
    />
  );
};

const PrivatePostsRoute = ({ uid }: { uid: string }) => {
  const [privatePosts, setPrivatePosts] = useState([]);
  const otherUserUid = uid;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const privateCollection = collection(database, "private");
      const privateQuery = query(
        privateCollection,
        where("uid", "==", otherUserUid)
      );
      const privateDocs = await getDocs(privateQuery);

      const allPrivatePosts = [];
      privateDocs.forEach((doc) => {
        allPrivatePosts.push({ ...doc.data(), id: doc.id });
      });

      setPrivatePosts(allPrivatePosts);
    };

    fetchPosts();
  }, []);

  return (
    <FlatList
      data={privatePosts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const createdAt = item.createdAt
          ? item.createdAt.toDate().toLocaleString()
          : "";
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.uid === otherUserUid) {
                      router.push("/profile");
                    } else {
                      router.push("OtherUserProfilePage", {
                        uid: item.uid,
                      });
                    }
                  }}
                >
                  <Text style={styles.postUsername}>{item.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (item.uid === otherUserUid) {
                      router.push("/profile");
                    } else {
                      router.push("OtherUserProfilePage", {
                        uid: item.uid,
                      });
                    }
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.userProfilePicture ||
                        "https://via.placeholder.com/40",
                    }}
                    style={styles.postUserImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {item.BibleInformation.map((info, infoIndex) => {
              return (
                <View key={infoIndex} style={styles.postBibleInformation}>
                  <Text style={styles.postBibleReference}>
                    {info.BibleBook} {info.BibleChapter}:{info.BibleVerse}
                  </Text>
                  <Text style={styles.postBibleText}>"{info.BibleText}"</Text>
                </View>
              );
            })}
            <Text style={styles.postUserOpinion}>{item.Content}</Text>
            <Text style={styles.postTimestamp}>{createdAt}</Text>
            <View style={styles.postFooter}>
              <View style={styles.praiseContainer}>
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.praiseCount}>
                  {item.praises ? item.praises.length : 0}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => router.push("/comments", { postId: item.id })}
              >
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.commentCount}>
                  {item.comments ? item.comments.length : 0}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

const QuestionPostsRoute = ({ uid }: { uid: string }) => {
  const [questionPosts, setQuestionPosts] = useState([]);
  const otherUserUid = uid;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const questionCollection = collection(database, "questions");
      const questionQuery = query(
        questionCollection,
        where("uid", "==", otherUserUid)
      );
      const questionDocs = await getDocs(questionQuery);

      const allQuestionPosts = [];
      questionDocs.forEach((doc) => {
        const postData = doc.data();
        // only add the post if it's not of type 'anonymous'
        if (postData.type !== "anonymous") {
          allQuestionPosts.push({ ...postData, id: doc.id });
        }
      });

      setQuestionPosts(allQuestionPosts);
    };

    fetchPosts();
  }, []);

  return (
    <FlatList
      data={questionPosts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const createdAt = item.createdAt
          ? item.createdAt.toDate().toLocaleString()
          : "";
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.uid === otherUserUid) {
                      router.push("/profile");
                    } else {
                      router.push("OtherUserProfilePage", {
                        uid: item.uid,
                      });
                    }
                  }}
                >
                  <Text style={styles.postUsername}>{item.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (item.uid === otherUserUid) {
                      router.push("/profile");
                    } else {
                      router.push("OtherUserProfilePage", {
                        uid: item.uid,
                      });
                    }
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.userProfilePicture ||
                        "https://via.placeholder.com/40",
                    }}
                    style={styles.postUserImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.postUserQuestion}>{item.Content}</Text>
            <Text style={styles.postTimestamp}>{createdAt}</Text>
            <View style={styles.postFooter}>
              <View style={styles.praiseContainer}>
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.praiseCount}>
                  {item.praises ? item.praises.length : 0}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => router.push("/commnets", { postId: item.id })}
              >
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.commentCount}>
                  {item.comments ? item.comments.length : 0}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default function Page() {
  const route = useRoute();
  const { uid } = route.params;
  console.log(uid);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "public", title: "Public" },
    { key: "private", title: "Private" },
    { key: "question", title: "Question" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "public":
        return <PublicPostsRoute uid={uid} />;
      case "private":
        return <PrivatePostsRoute uid={uid} />;
      case "question":
        return <QuestionPostsRoute uid={uid} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <OtherUserProfile route={route} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "black" }}
            style={{ backgroundColor: "white", marginTop: 70 }}
            labelStyle={{ color: "black" }} // set color for labels
            activeColor="black" // set active color for labels
          />
        )}
      />
    </View>
  );
}
