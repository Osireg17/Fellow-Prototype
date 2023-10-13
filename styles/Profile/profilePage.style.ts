// UserProfileStyles.js
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: -60,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
  },
  detailsContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detail: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#7D7D7D",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#2C3E50",
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Lighter border color
    padding: 15, // Increased padding
    marginBottom: 10, // Space between posts
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12, // Little more margin-bottom
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333", // Darker text
    marginBottom: 7, // Adjusted margin
  },
  postUsername: {
    marginRight: 8,
    fontWeight: "600", // Semi-bold
    color: "#555", // Dark gray
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postBibleInformation: {
    marginTop: 12,
    backgroundColor: "#F2F4F6", // Light blue-gray background
    padding: 12,
    borderRadius: 12, // Rounded corners
  },
  postBibleReference: {
    fontSize: 16,
    fontWeight: "600", // Semi-bold
  },
  postBibleText: {
    fontSize: 14,
    marginTop: 8,
    color: "#333", // Dark gray
  },
  postUserOpinion: {
    fontSize: 16, // Slightly larger text
    color: "#333",
    lineHeight: 22, // Improved line height
    marginTop: 12, // More margin
  },
  postTimestamp: {
    fontSize: 12,
    color: "#999", // Lighter gray
    marginTop: 15,
  },
  postUserQuestion: {
    fontSize: 16, // Increased size
    color: "#333",
    lineHeight: 22,
    marginTop: 10,
    backgroundColor: "#F2F4F6",
    padding: 12,
    borderRadius: 12, // Rounded corners
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12, // Increased top margin
  },
  praiseContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  praiseCount: {
    marginLeft: 8, // Increased left margin
    fontSize: 16,
    color: "#333", // Dark gray
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    marginLeft: 8, // Increased left margin
    fontSize: 16,
    color: "#333", // Dark gray
  },
});

export default styles;
