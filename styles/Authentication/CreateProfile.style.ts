import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 20,
    color: "#282C35", // Update the color of the title
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 10,
    color: "##282C35", // Update the color of the label
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  inputLarge: {
    height: 80,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  dateOfBirthInput: {
    height: 40,
    width: "100%",
    borderColor: "#ccc", // Set a more subtle border color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 12, // Add more paddingLeft for a better visual appearance
    paddingTop: 8, // Adjust the paddingTop to vertically center the text
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9", // Add a light background color
  },

  profileImageSelector: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#282C35", // Update the color of the profile image border
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addProfileImageText: {
    fontSize: 36,
    color: "gray",
  },
  saveButton: {
    backgroundColor: "#282C35", // Update the background color of the save button
    borderRadius: 5,
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    padding: 10,
  },
});

export default styles;
