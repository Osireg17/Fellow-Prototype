import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row", // Added to layout icon and text horizontally
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    alignItems: "center", // added for vertical centering
    width: "100%",
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14171A", // Twitter's dark text color
  },
  username: {
    color: "#657786", // Twitter's lighter text color
    fontWeight: "bold",
    paddingBottom: 5, // add some padding
  },
  action: {
    color: "#AAB8C2", // Lighten color
    paddingBottom: 5, // add some padding
  },
  postTitle: {
    color: "#14171A", // Twitter's dark text color
    fontWeight: "bold",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2, // Adding border
    borderColor: "#657786", // Border color
  },
});

export default styles;
