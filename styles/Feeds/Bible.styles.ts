import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  leftbutton: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 2,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightbutton: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 2,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonText: {
    color: "#000000",
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    height: "90%",
    marginHorizontal: 10,
    marginTop: windowHeight * 0.05,
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 25,
    padding: 12,
    elevation: 3,
    alignSelf: "center",
  },
  buttonClose: {
    backgroundColor: "#E76F51",
    marginBottom: 20,
    width: 140,
  },
  textStyle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#2C3E50",
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  chapterButton: {
    width: "23%", // slightly reduced for better spacing
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8, // increased margin for better spacing
    backgroundColor: "#F8E9D9",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chapterText: {
    fontSize: 20, // increased font size
    fontWeight: "600",
    color: "#5D5D5D",
  },
  versionItem: {
    padding: 15,
    backgroundColor: "#E5E5E5",
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  verseText: {
    fontSize: 18,
    color: "black",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "justify",
  },
  centerBold: {
    fontWeight: "bold",
    textAlign: "center",
  },
  plainText: {
    fontWeight: "normal",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
