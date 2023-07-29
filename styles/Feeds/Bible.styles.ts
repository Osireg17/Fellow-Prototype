import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  leftbutton: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 2,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightbutton: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 2,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonText: {
    color: '#000000',
  },
  modalText: {
    marginTop: 15,
    textAlign: "center"
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 35,
    paddingBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
    height: '100%',
    justifyContent: 'space-between',
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: '#000000',
    marginBottom: 15,
    width: 120,
  },
  textStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // to distribute items evenly
    padding: 10, // to give some space on the sides
  },
  chapterButton: {
    width: '22%', // adjusted to accommodate for padding and margin, for 4 items per row
    aspectRatio: 1, // to keep width and height the same, creating a square
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  chapterText: { // new style for the text inside the chapter buttons
    fontSize: 18, // increase this as needed
  },
  verseText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'justify',
  },
  
  centerBold: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  plainText: {
    fontWeight: 'normal',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default styles;





