import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      imageBackground: {
        flex: 1,
        justifyContent: 'center',
      },
      welcomeContainer: {
        paddingHorizontal: 40,
        paddingVertical: 30,
        borderRadius: 10,
        marginHorizontal: 20,
      },
      welcomeTitle: {
        fontSize: 50,
        color: '#fff',
        marginBottom: 50,
        textAlign: 'center',
        fontFamily: 'Avenir'
      },
      button: {
        backgroundColor: '#282C35',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginBottom: 25,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Avenir'
      },
})