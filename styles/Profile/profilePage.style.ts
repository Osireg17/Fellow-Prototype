// UserProfileStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: -60,
},
username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
},
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
avatar: {
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
},
statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
},
stat: {
    alignItems: 'center',
},
statLabel: {
    fontSize: 14,
    color: '#7D7D7D',
},
statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
},
detailsContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
},
detail: {
    marginBottom: 10,
},
label: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: 5,
},
value: {
    fontSize: 18,
    color: '#2C3E50',
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

