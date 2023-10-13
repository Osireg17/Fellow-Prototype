import { FontAwesome5 } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
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
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import QuestionComments from "../../components/QuestionComments";
import { database } from "../../config/firebase";

function QuestionCommentsPage({ route }) {
  const [question, setQuestion] = useState(null);
  const { post, uid, postId } = route.params;

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionDoc = await getDoc(doc(database, "questions", postId));
      if (questionDoc.exists()) {
        setQuestion(questionDoc.data());
      }
    };

    fetchQuestion();
  }, []);

  if (!question) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>{question.Title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {question.type === "public" ? (
                <>
                  <Text style={styles.questionUsername}>
                    {question.username}
                  </Text>
                  <Image
                    source={{
                      uri:
                        question.userProfilePicture ||
                        "https://via.placeholder.com/40",
                    }}
                    style={styles.questionUserImage}
                  />
                </>
              ) : (
                <FontAwesome5 name="theater-masks" size={24} color="black" />
              )}
            </View>
          </View>
          <Text style={styles.questionText}>{question.Content}</Text>
        </View>
        <QuestionComments postId={postId} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
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
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  questionUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  questionUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  questionUsername: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  questionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});

export default QuestionCommentsPage;
