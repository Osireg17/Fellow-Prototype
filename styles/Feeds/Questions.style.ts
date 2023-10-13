import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  postUsername: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  postUserImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  postUserOpinion: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
  },
  postTimestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  postStatsText: {
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 90,
    backgroundColor: "#FF4500",
    borderRadius: 30,
    elevation: 10,
  },
  profileImageContainer: {
    marginLeft: 15,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer: {
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  leftComponent: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 9,
  },
  centerComponent: {
    color: "black",
    fontSize: 24,
    paddingTop: 5,
  },
  rightComponent: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    marginRight: 10,
  },
  optionsButton: {
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "110%",
    marginRight: 10,
    marginLeft: -20,
    marginTop: 5,
  },
  postFooterIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  iconWithCount: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  postFooterIcon: {
    marginRight: 10, // Add some margin to separate the icon groups
  },
});

export default styles;
