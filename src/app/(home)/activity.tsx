import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Header as HeaderRNE } from "react-native-elements";

import { database } from "../../config/firebase";
import styles from "../../styles/Feeds/Activity.styles";

import { useAuth } from "@/context/auth";

function Header() {
  return (
    <HeaderRNE
      centerComponent={{
        text: "Activity",
        style: {
          color: "#000",
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
      containerStyle={styles.header}
    />
  );
}

export default function Page() {
  const [activity, setActivity] = useState<
    {
      type: string;
      username: string;
      title: string;
      profilePic: string;
    }[]
  >([]);

  const { user } = useAuth();
  const uid = user?.uid;

  const listenToActivity = () => {
    const publicCollection = collection(database, "public");
    const privateCollection = collection(database, "private");
    const questionCollection = collection(database, "questions");

    const publicQuery = query(publicCollection, where("uid", "==", uid));
    const privateQuery = query(privateCollection, where("uid", "==", uid));
    const questionQuery = query(questionCollection, where("uid", "==", uid));

    const publicUnsub = onSnapshot(publicQuery, (snapshot) =>
      processSnapshot(snapshot, "public")
    );
    const privateUnsub = onSnapshot(privateQuery, (snapshot) =>
      processSnapshot(snapshot, "private")
    );
    const questionUnsub = onSnapshot(questionQuery, (snapshot) =>
      processSnapshot(snapshot, "questions")
    );

    return () => {
      publicUnsub();
      privateUnsub();
      questionUnsub();
    };
  };

  const processSnapshot = async (
    snapshot: QuerySnapshot<DocumentData, DocumentData>,
    type: string
  ) => {
    const activities = await Promise.all(
      snapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();

        if (!postData.praises) {
          return [];
        }

        return Promise.all<
          [
            {
              type: string;
              username: string;
              title: string;
              profilePic: string;
            } | null,
          ]
        >(
          postData.praises.map(async (likerId: string) => {
            const userDocRef = doc(database, "user", likerId);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
              return null;
            }

            const likerData = userDoc.data();
            return {
              type,
              username: likerData.username,
              title: postData.Title,
              profilePic: likerData.profilePicture,
            };
          })
        );
      })
    );

    const flattenedActivities = activities.flat().filter(Boolean);
    setActivity((prevActivities) => [
      ...prevActivities,
      ...flattenedActivities,
    ]);
  };

  useEffect(() => {
    const unsubscribe = listenToActivity();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Header />
      <ScrollView>
        {activity.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image
              source={{
                uri: item.profilePic || "https://via.placeholder.com/30",
              }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.action}>liked your post</Text>
              <Text style={styles.postTitle}>"{item.title}"</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
