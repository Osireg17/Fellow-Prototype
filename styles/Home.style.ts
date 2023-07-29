import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: 'black',
    fontSize: 22,
    marginRight: 5,
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginLeft: 15,
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scene: {
    flex: 1,
    marginHorizontal: 5,

  },
  indicator: {
    backgroundColor: 'black',
  },
  tabBar: {
    backgroundColor: 'white',
    paddingTop: 10
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    width: 150,
    height: 40,
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 10,
    borderColor: "transparent"
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '110%',
    marginRight: 10,
    marginLeft: -20,
    height: 20,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    
    shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  postUserOpinion: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postTimestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  postBibleInformation: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginBottom: 10,
  },
  postBibleText: {
    fontSize: 14,
    marginBottom: 5,
  },
  
  postBibleReference: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  postStatsText: {
    marginLeft: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  searchIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderColor: "transparent"
  },
  searchIcon: {
    color: '#888',
  },
  
});
