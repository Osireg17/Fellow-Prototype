import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 30,
  },
  profileContainer: {
    flex: 1,
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    alignItems: 'flex-start',
    marginRight: 20,
  },
  avatar: {},
  username: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  stat: {},
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detail: {},
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  value: {
    fontSize: 16,
      backgroundColor: '#f9f9f9',
      padding: 5,
      borderRadius: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#282C35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 5,
  },
  postUsername: {
    fontWeight: '500',
  },
  postTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  postBibleInformation: {
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  postBibleReference: {
    fontWeight: '500',
  },
  postBibleText: {
    marginTop: 5,
    lineHeight: 20,
  },
  postUserOpinion: {
    lineHeight: 20,
    marginTop: 10,
  },
  postTimestamp: {
    color: '#888',
    marginTop: 15,
  },
  scene : {
    flex: 1,
  },
  postUserQuestion: {
    lineHeight: 20,
    marginTop: 5,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  praiseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  praiseCount: {
    marginLeft: 5,
    fontWeight: '500',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginLeft: 5,
    fontWeight: '500',
  },
  
});

export default styles;

