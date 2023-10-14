import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { Header as HeaderRNE, SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native-ui-lib";

import { database } from "../config/firebase";
import styles from "../styles/Feeds/Search.styles";

const SearchBarHeader = ({ setSearch, search, executeSearch }) => {
  const router = useRouter();
  return (
    <View>
      <HeaderRNE
        containerStyle={styles.headerContainer}
        backgroundColor="#fff"
        leftComponent={
          <TouchableOpacity
            style={styles.leftComponent}
            onPress={() => {
              router.back();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        }
        centerComponent={
          <SearchBar
            platform="default"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={styles.searchBarInput}
            placeholder="search for users"
            searchIcon
            lightTheme
            round
            onChangeText={setSearch}
            value={search}
          />
        }
        rightComponent={
          <TouchableOpacity
            style={styles.rightComponent}
            onPress={executeSearch}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userCollection = await getDocs(collection(database, "user"));
      const usersData = userCollection.docs.map((doc) => doc.data());
      setUsers(usersData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  const executeSearch = () => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        <SearchBarHeader
          setSearch={setSearch}
          search={search}
          executeSearch={executeSearch}
        />
        {search === "" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Looking for someone...</Text>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Sorry, we can't find that user</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.email}
            style={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push("/profile/view", {
                    uid: item.uid,
                  });
                }}
              >
                <View style={styles.listItemContainer}>
                  <Image
                    style={styles.listItemImage}
                    source={{
                      uri:
                        item.profilePicture || "https://via.placeholder.com/40",
                    }}
                  />
                  <View>
                    <Text style={styles.listItemText}>{item.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
