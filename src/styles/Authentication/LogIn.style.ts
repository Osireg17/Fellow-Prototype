import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  backArrowContainer: {
    position: "absolute",
    top: 80,
    left: 10,
  },
  loginWrapper: {
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
  },
  errorInput: {
    borderColor: "red",
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "#5F5F5F",
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#282C35",
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 30,
  },
  loginButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    color: "#5F5F5F",
    paddingHorizontal: 15,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 15,
  },
  appleButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#DB4437",
    borderRadius: 5,
    paddingVertical: 12,
  },
  googleButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  registerTextContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  registerText: {
    color: "#1E90FF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  scrollContent: {
    flexGrow: 2,
  },
  forgotPasswordContainer: {
    alignContent: "center",
  },
});
