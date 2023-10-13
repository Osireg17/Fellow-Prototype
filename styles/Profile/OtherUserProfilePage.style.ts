import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    marginRight: 25,
    borderColor: "#E0E0E0",
    borderWidth: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
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
    marginTop: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detail: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#7D7D7D",
  },
  value: {
    fontSize: 18,
    color: "#2C3E50",
  },
  buttonWrapper: {
    marginTop: 20,
    width: "90%", // Adjusting this to a higher percentage will make it wider
    alignItems: "center",
  },
  followButton: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 30,
    width: "100%", // Set to full width of its container (buttonWrapper)
    alignItems: "center",
  },
  unfollowButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 30,
    width: "100%", // Set to full width of its container (buttonWrapper)
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  postUserImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
  },
  postUsername: {
    fontWeight: "500",
  },
  postTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  postBibleInformation: {
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
  postBibleReference: {
    fontWeight: "500",
  },
  postBibleText: {
    marginTop: 5,
    lineHeight: 20,
  },
  postUserOpinion: {
    lineHeight: 20,
    marginTop: 10,
  },
  postTimestamp: {
    color: "#888",
    marginTop: 15,
  },
  scene: {
    flex: 1,
  },
  postUserQuestion: {
    lineHeight: 20,
    marginTop: 5,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  praiseContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  praiseCount: {
    marginLeft: 5,
    fontWeight: "500",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    marginLeft: 5,
    fontWeight: "500",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    width: 24, // same as the arrow icon size
    height: 24,
    // You can set a backgroundColor for debugging purposes, but it should be transparent in the final design
    // backgroundColor: 'red',
  },
});

export default styles;
