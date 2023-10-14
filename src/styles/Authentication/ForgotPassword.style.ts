import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10, // Updated from 20 to 10
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#282C35",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  header: {
    backgroundColor: "#fff",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default styles;

// Path: styles/Authentication/SignIn.style.ts
