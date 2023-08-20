import { Text, View, TouchableOpacity, FlatList, Dimensions, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Avatar } from 'react-native-elements';
import { database } from '../../config/firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../../styles/Profile/OtherUserProfilePage.style'
import { TabView, TabBar } from 'react-native-tab-view';
import { AntDesign, } from '@expo/vector-icons';

import RenderHTML from 'react-native-render-html';




function OtherUserProfile({ navigation, route }) {
  const { uid } = route.params;
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [praises, setPraises] = useState([]);
  const [favoriteVerse, setFavoriteVerse] = useState('');
  const [church, setChurch] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleConnect = async () => {
    const auth = getAuth();
    const currentUserUid = auth.currentUser.uid;

    const userDocRef = doc(database, 'user', uid);
    const currentUserDocRef = doc(database, 'user', currentUserUid);

    console.log(`Connect state before operation: ${isFollowing}`);
    console.log(`Current user ID: ${currentUserUid}`);
    console.log(`Other user ID: ${uid}`);

    if (isFollowing) {
      console.log('Attempting to disconnect...');
      await updateDoc(userDocRef, {
        followers: arrayRemove(currentUserUid),
      });
      await updateDoc(currentUserDocRef, {
        following: arrayRemove(uid),
      });
      setIsFollowing(false);
    } else {
      console.log('Attempting to connect...');
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
    const userDocRef = doc(database, 'user', uid);

    const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
      if (userDocSnap.exists()) {
        setUsername(userDocSnap.data().username);
        setFollowers(userDocSnap.data().followers);
        setFollowing(userDocSnap.data().following);
        setPraises(userDocSnap.data().totalPraises);
        setFavoriteVerse(userDocSnap.data().favouriteVerse);
        setChurch(userDocSnap.data().church);
        setProfilePic(userDocSnap.data().profilePicture);

        // Check if the current user is already connected to the viewed user
        const auth = getAuth();
        const currentUserUid = auth.currentUser.uid;
        if (userDocSnap.data().followers.includes(currentUserUid)) {
          setIsFollowing(true);
        }
      } else {
        console.log('No such document!');
      }
    }, (error) => {
      console.log("Error fetching user's profile picture:", error);
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [isFollowing]);


  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            size={100}
            source={{ uri: profilePic || 'https://via.placeholder.com/200' }}
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
              <Text style={styles.statValue}>{praises ??
                0
              }</Text>
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
            <Text style={styles.buttonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const PublicPostsRoute = ({ navigation, uid }) => {
  const [publicPosts, setPublicPosts] = useState([]);
  const otherUserUid = uid;

  useEffect(() => {
    const fetchPosts = async () => {
      const publicCollection = collection(database, 'public');
      const publicQuery = query(publicCollection, where('uid', '==', otherUserUid));
      const publicDocs = await getDocs(publicQuery);

      let allPublicPosts = [];
      publicDocs.forEach(doc => {
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
        const createdAt = item.createdAt ? item.createdAt.toDate().toLocaleString() : '';
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Text style={styles.postUsername}>{item.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Image
                    source={{ uri: item.userProfilePicture || 'https://via.placeholder.com/40' }}
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
                  <RenderHTML
                    contentWidth={Dimensions.get('window').width}
                    source={{ html: info.BibleText }}
                  />
                </View>
              );
            })}
            <Text style={styles.postUserOpinion}>{item.Content}</Text>
            <Text style={styles.postTimestamp}>{createdAt}</Text>
            <View style={styles.postFooter}>
              <View style={styles.praiseContainer}>
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.praiseCount}>{item.praises ? item.praises.length : 0}</Text>
              </View>
              <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('CommentsPage', { postId: item.id })}>
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.commentCount}>{item.comments ? item.comments.length : 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );

}

const PrivatePostsRoute = ({ navigation, uid }) => {
  const [privatePosts, setPrivatePosts] = useState([]);
  const otherUserUid = uid;

  useEffect(() => {
    const fetchPosts = async () => {
      const privateCollection = collection(database, 'private');
      const privateQuery = query(privateCollection, where('uid', '==', otherUserUid));
      const privateDocs = await getDocs(privateQuery);

      let allPrivatePosts = [];
      privateDocs.forEach(doc => {
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
        const createdAt = item.createdAt ? item.createdAt.toDate().toLocaleString() : '';
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Text style={styles.postUsername}>{item.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Image
                    source={{ uri: item.userProfilePicture || 'https://via.placeholder.com/40' }}
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
                  <Text style={styles.postBibleText}>
                    "{info.BibleText}"
                  </Text>
                </View>
              );
            })}
            <Text style={styles.postUserOpinion}>{item.Content}</Text>
            <Text style={styles.postTimestamp}>{createdAt}</Text>
            <View style={styles.postFooter}>
              <View style={styles.praiseContainer}>
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.praiseCount}>{item.praises ? item.praises.length : 0}</Text>
              </View>
              <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('CommentsPage', { postId: item.id })}>
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.commentCount}>{item.comments ? item.comments.length : 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}

const QuestionPostsRoute = ({ navigation, uid }) => {
  const [questionPosts, setQuestionPosts] = useState([]);
  const otherUserUid = uid;

  useEffect(() => {
    const fetchPosts = async () => {
      const questionCollection = collection(database, 'questions');
      const questionQuery = query(questionCollection, where('uid', '==', otherUserUid));
      const questionDocs = await getDocs(questionQuery);

      let allQuestionPosts = [];
      questionDocs.forEach(doc => {
        const postData = doc.data();
        // only add the post if it's not of type 'anonymous'
        if (postData.type !== 'anonymous') {
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
        const createdAt = item.createdAt ? item.createdAt.toDate().toLocaleString() : '';
        return (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{item.Title}</Text>
              <View style={styles.postUser}>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Text style={styles.postUsername}>{item.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (item.uid === otherUserUid) { navigation.navigate('Profile'); } else {
                    navigation.navigate('OtherUserProfilePage', { uid: item.uid });
                  }
                }}>
                  <Image
                    source={{ uri: item.userProfilePicture || 'https://via.placeholder.com/40' }}
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
                <Text style={styles.praiseCount}>{item.praises ? item.praises.length : 0}</Text>
              </View>
              <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('CommentsPage', { postId: item.id })}>
                <AntDesign name="message1" size={24} color="black" />
                <Text style={styles.commentCount}>{item.comments ? item.comments.length : 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      }
    />
  );
}

const OtherUserProfilePage = ({ navigation, route }) => {
  const { uid } = route.params;
  console.log(uid);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'public', title: 'Public' },
    { key: 'private', title: 'Private' },
    { key: 'question', title: 'Question' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'public':
        return <PublicPostsRoute navigation={navigation}
          uid={uid}
        />;
      case 'private':
        return <PrivatePostsRoute navigation={navigation}
          uid={uid}
        />;
      case 'question':
        return <QuestionPostsRoute navigation={navigation}
          uid={uid}
        />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
        <OtherUserProfile navigation={navigation} route={route} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          style={{ backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 50 : 220 }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'black' }}
              labelStyle={{ color: 'black' }}  // set color for labels
              activeColor="black"  // set active color for labels
              style={{ backgroundColor: 'white' }} // set background color for tab bar
            />
          )}
        />
    </SafeAreaProvider>
  );
}


export default OtherUserProfilePage;