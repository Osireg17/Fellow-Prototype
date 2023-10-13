import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    marginTop: -30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  verseContainer: {
    marginBottom: 20,
  },
  text: {
    fontStyle: "italic",
  },
  reference: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18,
  },
  TitleInput: {
    height: 40,
    width: "100%",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  input: {
    height: 140,
    width: "100%",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonContainer: {
    marginTop: 40,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  backArrow: {
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 20,
  },
  // Similar styling for Android
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginTop: 20, // to ensure the text is never behind the icon
  },
});

export { styles, pickerSelectStyles };
