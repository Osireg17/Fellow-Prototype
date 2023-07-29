import {
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE } from 'react-native-elements';
import styles from '../../styles/Feeds/Activity.styles';
import { getAuth } from 'firebase/auth';
import { database } from '../../config/firebase';
import { collection, doc, getDoc, query, where, onSnapshot } from 'firebase/firestore';

function Header() {
  return (
    <HeaderRNE
      centerComponent={{ text: 'Activity', style: { 
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold', 
      } }}
      containerStyle={styles.header}
    />
  );
}

const Activity = () => {
  const [activity, setActivity] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  const listenToActivity = () => {
    const publicCollection = collection(database, 'public');
    const privateCollection = collection(database, 'private');
    const questionCollection = collection(database, 'questions');

    const publicQuery = query(publicCollection, where('uid', '==', uid));
    const privateQuery = query(privateCollection, where('uid', '==', uid));
    const questionQuery = query(questionCollection, where('uid', '==', uid));

    const publicUnsub = onSnapshot(publicQuery, (snapshot) => processSnapshot(snapshot, 'public'));
    const privateUnsub = onSnapshot(privateQuery, (snapshot) => processSnapshot(snapshot, 'private'));
    const questionUnsub = onSnapshot(questionQuery, (snapshot) => processSnapshot(snapshot, 'questions'));

    return () => {
      publicUnsub();
      privateUnsub();
      questionUnsub();
    };
  };

  const processSnapshot = async (snapshot, type) => {
    const activities = await Promise.all(
      snapshot.docs.map(async (postDoc) => {
        let postData = postDoc.data();
        if (postData.praises) {
          return Promise.all(
            postData.praises.map(async (likerId) => {
              const userDocRef = doc(database, 'user', likerId);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                let likerData = userDoc.data();
                return {
                  type,
                  username: likerData.username,
                  title: postData.Title,
                  profilePic: likerData.profilePicture,
                };
              } else {
                return null;
              }
            })
          );
        } else {
          return [];
        }
      })
    );

    const flattenedActivities = activities.flat().filter(Boolean);
    setActivity((prevActivities) => [...prevActivities, ...flattenedActivities]);
  };

  useEffect(() => {
    const unsubscribe = listenToActivity();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Header />
      <ScrollView>
        {activity.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image source={{uri: item.profilePic || 'https://via.placeholder.com/30' }} style={styles.profilePic} />
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.action}>liked your post</Text>
              <Text style={styles.postTitle}>"{item.title}"</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Activity;
