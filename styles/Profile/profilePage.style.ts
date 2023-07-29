// UserProfileStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: -60, // Removed the negative margin
  },
  username: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  avatar: {
    marginRight: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    marginRight: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0, // Minimize empty space after container
  },
    detail: {
      flex: 1,
      padding: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      fontSize: 18,
      backgroundColor: '#f9f9f9',
      padding: 5,
      borderRadius: 10,
    },  
  postContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  postUsername: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postBibleInformation: {
    marginTop: 10,
    backgroundColor: '#f5f8fa',
    padding: 10,
    borderRadius: 10,
  },
  postBibleReference: {
    fontSize: 16,
    fontWeight: '500',
  },
  postBibleText: {
    fontSize: 14,
    marginTop: 5,
  },
  postUserOpinion: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 15,
  },
  scene : {
    flex: 1,
  },
  postUserQuestion: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginTop: 5,
    backgroundColor: '#f5f8fa',
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
    fontSize: 16,
    color: '#000',
  },
  
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  commentCount: {
    marginLeft: 5,
    fontSize: 16,
    color: '#000',
  },
  
});

export default styles;

