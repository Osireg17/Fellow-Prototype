import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backArrowContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  signUpWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  signUpTitle: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  signUpButton: {
    backgroundColor: '#282C35',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#B0B0B0',
  },
  dividerText: {
    color: '#B0B0B0',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  googleButton: {
    backgroundColor: '#FF3E30',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  registerTextContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  registerText: {
    color: '#1E90FF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorInput: {
    borderColor: "red",
    
  },
errorText: {
  color: "red",
  fontSize: 12,
  marginBottom: 5,
  marginLeft: 10,
},
scrollContent: {
  flexGrow: 1,
},
});
