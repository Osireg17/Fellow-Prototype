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
  scene: {
    flex: 1,
    marginHorizontal: 5,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 15,
    borderRadius: 15,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUsername: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginRight: 10,
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  postTimestamp: {
    fontSize: 11,
    color: '#aaa',
    marginBottom: 10,
  },
  postBibleInformation: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  postBibleText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  postBibleReference: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  postUserOpinion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    lineHeight: 24,
    marginBottom: 15,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderColor: "transparent"
  },
  searchIcon: {
    color: '#888',
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
});
