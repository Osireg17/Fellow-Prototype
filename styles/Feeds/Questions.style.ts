import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
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
  fab: {
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 120, 
    backgroundColor: '#282C35', 
    borderRadius: 30, 
    elevation: 8
  },
  profileImageContainer: {
    marginLeft: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 9
  },
  centerComponent: {
    color: 'black',
    fontSize: 24,
    paddingTop: 5
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginRight: 10,
  },
  optionsButton: {
    marginLeft: 10,
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
    marginTop: 5,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%',
  },
  postFooterIcons: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: 'space-between',
  width: '50%'
},
iconWithCount: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 5,
},
postFooterIcon: {
  marginRight: 10, // Add some margin to separate the icon groups
},

});

export default styles;

