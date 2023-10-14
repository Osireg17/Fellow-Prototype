import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: 105,
    marginTop: -20,
    borderColor: "#fff",
  },
  leftComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    backgroundColor: "white",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarInputContainer: {
    backgroundColor: "#eee",
    width: "100%",
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarInput: {
    color: "black",
    fontSize: 14,
  },
  rightComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10, // Add some padding
    borderBottomWidth: 0.5, // Add a slight border at the bottom of each item
    borderBottomColor: "#d3d3d3", // Light grey color for the border
    backgroundColor: "white",
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Add some space between the image and the text
  },
  listItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
