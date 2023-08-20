import { StyleSheet, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const iOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: iOS ? '#FFFFFF' : '#FFFFFF',
    borderRadius: iOS ? 15 : 0,
    shadowColor: iOS ? '#000' : undefined,
    shadowOffset: iOS ? { width: 0, height: 2 } : undefined,
    shadowOpacity: iOS ? 0.1 : undefined,
    shadowRadius: iOS ? 6 : undefined,
    elevation: iOS ? undefined : undefined,
    zIndex: iOS ? -10 : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    marginRight: 25,
    borderColor: iOS ? '#E0E0E0' : '#D1D1D1',
    borderWidth: 2,
    elevation: iOS ? 5 : 2,
    shadowColor: iOS ? '#000' : undefined,
    shadowOffset: iOS ? { width: 0, height: 2 } : undefined,
    shadowOpacity: iOS ? 0.2 : undefined,
    shadowRadius: iOS ? 6 : undefined,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  detailsContainer: {
    backgroundColor: iOS ? '#FFFFFF' : '#F5F5F5',
    width: '100%',
    padding: 15,
    borderRadius: iOS ? 15 : 5,
    marginTop: -20,
    shadowColor: iOS ? '#000' : undefined,
    shadowOffset: iOS ? { width: 0, height: 2 } : undefined,
    shadowOpacity: iOS ? 0.1 : undefined,
    shadowRadius: iOS ? 8 : undefined,
    elevation: iOS ? undefined : 5,
  },
  detail: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#7D7D7D',
  },
  value: {
    fontSize: 18,
    color: '#2C3E50',
  },
  buttonWrapper: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  unfollowButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  postContainer: {
    backgroundColor: iOS ? '#FFFFFF' : '#F5F5F5',
    borderRadius: iOS ? 20 : 10,
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
    backgroundColor: iOS ? '#E5E5E5' : '#D7D7D7',
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
  scene: {
    flex: 1,
  },
  postUserQuestion: {
    lineHeight: 20,
    marginTop: 5,
    backgroundColor: iOS ? '#E5E5E5' : '#D7D7D7',
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
  spacer: {
    width: 24,
    height: 24,
  },
  tabBar: {
    width: windowWidth,
    height: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginTop: 30,
    flex: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
  },
});

export default styles;


