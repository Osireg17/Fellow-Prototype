import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Header as HeaderRNE } from "react-native-elements";
import RenderHTML from "react-native-render-html";
import { Card } from "react-native-ui-lib";

import styles from "../../styles/Home.style";

import { database } from "@/config/firebase";
import { useAuth } from "@/context/auth";

async function fetchProfilePicture(uid: string) {
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

function getAllPublicPosts(setPublicPosts, value) {
  const q = query(collection(database, "public"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (querySnapshot) => {
    let posts: any[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt,
      });
    });

    posts = sortPosts(posts, value); // Sort the posts
    setPublicPosts(posts); // Update the state with the fetched posts
  });
}

function getAllPrivatePosts(setPrivatePosts, value) {
  const auth = getAuth();
  const currentUserUid = auth.currentUser.uid;

  const currentUserDocRef = doc(database, "user", currentUserUid);

  onSnapshot(currentUserDocRef, (currentUserDocSnap) => {
    const data = currentUserDocSnap.data();
    console.log("Current user data:", data);

    let uids = [];
    if (Array.isArray(data.following)) {
      uids = [...data.following, currentUserUid];
    } else {
      uids = [currentUserUid];
    }

    const q = query(
      collection(database, "private"),
      where("uid", "in", uids),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        // Check if doc.data() is not null or undefined
        if (doc.data()) {
          const docData = doc.data();
          const createdAt = docData.createdAt ? docData.createdAt : null; // Set createdAt to null if it doesn't exist

          posts.push({ ...docData, id: doc.id, createdAt });
        }
      });

      posts = sortPosts(posts, value); // Sort the posts
      setPrivatePosts(posts);
    });
  });
}

function sortPosts(posts, value: "trending" | "latest" | "home") {
  // Define a function that sorts posts based on the value of the dropdown
  switch (value) {
    case "trending":
      // Sort posts in descending order by likes
      return posts.sort((a, b) => b.praises.length - a.praises.length);
    case "latest":
      // Sort posts in descending order by creation time
      return posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    case "home":
    default:
      // Return posts as they are
      return posts;
  }
}

const PostStats = ({
  post,
  uid,
  onPraiseUpdate,
  onCommentClick,
  postType,
}: {
  post: any;
  uid: string;
  onPraiseUpdate: (updatedPraises: string[]) => void;
  onCommentClick: () => void;
  postType: string;
}) => {
  const [praises, setPraises] = useState(post.praises);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    // Get a reference to the comments subcollection
    const commentsRef = collection(database, postType, post.postId, "comments");

    // Fetch the comments
    const querySnapshot = await getDocs(commentsRef);

    // Update the state with the new comments
    setComments(querySnapshot.docs.map((doc) => doc.data()));
  };

  const handleLikePress = async () => {
    if (!liked) {
      await updateDoc(doc(database, postType, post.postId), {
        praises: arrayUnion(uid),
        praisesCount: post.praises.length + 1,
      });
      setPraises([...post.praises, uid]);
      setLiked(true);
    } else {
      await updateDoc(doc(database, postType, post.postId), {
        praises: arrayRemove(uid),
        praisesCount: post.praises.length - 1,
      });
      setPraises(post.praises.filter((praise) => praise !== uid));
      setLiked(false);
    }

    updateTotalUserPraises(post.uid);
  };

  const updateTotalUserPraises = async (uid) => {
    const userDocRef = doc(database, "user", uid);

    // Get every post that has the same uid as the current user
    const userPostsQuery = query(
      collection(database, "public"),
      where("uid", "==", uid)
    );

    // Fetch posts
    const querySnapshot = await getDocs(userPostsQuery);

    // Calculate total praises from all user's posts
    let totalPraises = 0;
    querySnapshot.forEach((doc) => {
      totalPraises += doc.data().praisesCount;
    });

    // Update the user document with totalPraises
    await updateDoc(userDocRef, {
      totalPraises,
    });
  };

  useEffect(() => {
    fetchComments();

    setLiked(post.praises.includes(uid));
    setPraises(post.praises);
  }, [post]);

  return (
    <View style={styles.postStats}>
      <TouchableOpacity onPress={handleLikePress}>
        <View style={styles.iconContainer}>
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={24}
            color={liked ? "red" : "black"}
            style={styles.icon}
          />
          <Text style={styles.postStatsText}>{praises.length}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCommentClick}>
        <View style={styles.iconContainer}>
          <AntDesign name="message1" size={24} color="black" />
          <Text style={styles.postStatsText}>{comments.length}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "For You" },
    { key: "second", title: "Following" },
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Trending", value: "trending" },
    {
      label: "Latest",
      value: "latest",
    },
    {
      label: "Home",
      value: "Home",
    },
  ]);
  const [profilePicture, setProfilePicture] = useState("");
  const [publicPosts, setPublicPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);

  const uid = user!.uid;

  useEffect(() => {
    fetchProfilePicture(uid).then((pictureUrl) => {
      console.log("Profile picture URL:", pictureUrl);
      setProfilePicture(pictureUrl);
    });
  }, [uid]);

  useEffect(() => {
    const unsubscribe = getAllPublicPosts(setPublicPosts, value);
    return unsubscribe; // to unsubscribe from real-time updates when the component unmounts
  }, [value]);

  useEffect(() => {
    const unsubscribe = getAllPrivatePosts(setPrivatePosts, value);
    return unsubscribe; // to unsubscribe from real-time updates when the component unmounts
  }, [value]);

  const [selectedValue, setSelectedValue] = useState("home");

  const [readMoreState, setReadMoreState] = useState({}); // For tracking read more state

  const toggleReadMore = (index) => {
    setReadMoreState({
      ...readMoreState,
      [index]: !readMoreState[index],
    });
  };

  const FirstRoute = ({ publicPosts }) => (
    <View style={[styles.scene, { backgroundColor: "#FBF8F8" }]}>
      <FlatList
        data={publicPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const createdAt = item.createdAt
            ? item.createdAt.toDate().toLocaleString()
            : "";
          const isReadMore = readMoreState[index];
          return (
            <Card key={index} containerStyle={styles.postContainer}>
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{item.Title}</Text>
                <View style={styles.postUser}>
                  <Link
                    href={
                      item.uid === uid
                        ? "/profile"
                        : `/profile/view/${item.uid}`
                    }
                  >
                    <TouchableOpacity>
                      <Text style={styles.postUsername}>{item.username}</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link
                    href={
                      item.uid === uid
                        ? "/profile"
                        : `/profile/view/${item.uid}`
                    }
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
                    <RenderHTML
                      contentWidth={Dimensions.get("window").width}
                      source={{ html: info.BibleText }}
                    />
                  </View>
                );
              })}
              <View>
                <Text
                  style={styles.postUserOpinion}
                  numberOfLines={isReadMore ? undefined : 3}
                >
                  {item.Content}
                </Text>
                {item.Content.length > 200 && (
                  <TouchableOpacity onPress={() => toggleReadMore(index)}>
                    <Text style={{ color: "black" }}>
                      {isReadMore ? "Read Less" : "Read More"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.postTimestamp}>{createdAt}</Text>
              <PostStats
                uid={uid}
                post={item}
                onPraiseUpdate={(updatedPraises) => {
                  publicPosts[index].praises = updatedPraises;
                  setPublicPosts([...publicPosts]);
                }}
                onCommentClick={() => {
                  router.push({
                    pathname: "/comments",
                    params: {
                      postId: item.id,
                      post: item,
                    },
                  });
                }}
                postType="public"
              />
            </Card>
          );
        }}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#FBF8F8" }]}>
      <ScrollView>
        {privatePosts.map((post, index) => {
          const createdAt = post.createdAt
            ? post.createdAt.toDate().toLocaleString()
            : "";
          const isReadMore = readMoreState[index];
          return (
            <Card key={index} containerStyle={styles.postContainer}>
              <View style={styles.postHeader}>
                <Text style={styles.postTitle}>{post.Title}</Text>
                <View style={styles.postUser}>
                  <Link
                    href={
                      post.uid === uid
                        ? "/profile"
                        : `/profile/view/${post.uid}`
                    }
                  >
                    <TouchableOpacity>
                      <Text style={styles.postUsername}>{post.username}</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link
                    href={
                      post.uid === uid
                        ? "/profile"
                        : `/profile/view/${post.uid}`
                    }
                  >
                    <TouchableOpacity>
                      <Image
                        source={{
                          uri:
                            post.userProfilePicture ||
                            "https://via.placeholder.com/40",
                        }}
                        style={styles.postUserImage}
                      />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>

              {post.BibleInformation.map((info, infoIndex) => (
                <View key={infoIndex} style={styles.postBibleInformation}>
                  <Text style={styles.postBibleReference}>
                    {info.BibleBook} {info.BibleChapter}:{info.BibleVerse}
                  </Text>
                  <RenderHTML
                    contentWidth={Dimensions.get("window").width}
                    source={{ html: info.BibleText }}
                  />
                </View>
              ))}

              <View>
                <Text
                  style={styles.postUserOpinion}
                  numberOfLines={isReadMore ? undefined : 3}
                >
                  {post.Content}
                </Text>
                {post.Content.length > 200 && (
                  <TouchableOpacity onPress={() => toggleReadMore(index)}>
                    <Text style={{ color: "black" }}>
                      {isReadMore ? "Read Less" : "Read More"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.postTimestamp}>{createdAt}</Text>

              <PostStats
                uid={uid}
                post={post}
                onPraiseUpdate={(updatedPraises) => {
                  privatePosts[index].praises = updatedPraises;
                  setPrivatePosts([...privatePosts]);
                }}
                onCommentClick={() => {
                  router.push({
                    pathname: "/comments",
                    params: {
                      postId: post.id,
                      post,
                    },
                  });
                }}
                postType="private"
              />
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute publicPosts={publicPosts} />;
      case "second":
        return <SecondRoute privatePosts={privatePosts} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderRNE
        containerStyle={{
          height: 100,
          paddingBottom: 30,
          paddingTop: 20,
          backgroundColor: "#FFFFFF",
          zIndex: 100,
        }}
        leftComponent={
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              placeholder="Home"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: "#ffffff",
                borderWidth: 0,
                borderColor: "white",
                borderRadius: 0,
              }}
              containerStyle={{
                width: 150,
                height: 40,
                borderRadius: 0,
              }}
            />
          </View>
        }
        rightComponent={
          <View style={styles.rightComponent}>
            <Link href="/search">
              <TouchableOpacity style={styles.searchIconContainer}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            </Link>
          </View>
        }
      />
    </View>
  );
}
