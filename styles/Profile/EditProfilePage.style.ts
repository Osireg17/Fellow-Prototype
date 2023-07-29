import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center', // Add padding to move everything up
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 20,
        color: '#59ADFF',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        color: '#282C35',
    },
    input: {
        height: 50, // Increase height
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 18, // Increase font size
    },
    avatar: {
        marginBottom: 20,
    },
    usernameInput: {
        height: 50, // Increase height
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14, // Increase font size
    },
    detailsContainer: {
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    detail: {
        flexDirection: 'column',
    },
    valueInput: {
        height: 50, // Increase height
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        width: '100%',
        fontSize: 14, // Increase font size
    },
    TextInputLarge: {
        height: 80,
        width: '100%',
        borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    },
    button: {
        backgroundColor: '#282C35',
        borderRadius: 5,
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        padding: 10,
    },
});

export default styles;
