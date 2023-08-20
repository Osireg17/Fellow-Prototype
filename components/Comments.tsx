import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useCommentsLogic } from './utils/Comments';


const Comments = ({postId, postType}) => {
  const navigation = useNavigation();
  const {
    commentText,
    setCommentText,
    comments,
    handlePostComment,
    handleLike
  } = useCommentsLogic(postId, postType);
  
  return (
    <SafeAreaProvider>
      <ScrollView>
      <View>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            multiline={true}
            scrollEnabled={true}
          />
          <TouchableOpacity onPress={handlePostComment}>
            <Ionicons name="send" size={20} color="black" />
          </TouchableOpacity>
        </View>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <View style={styles.commentHeader}>
              <Image
                source={{ uri: comment.userProfilePicture || 'https://via.placeholder.com/30' }}
                style={styles.commentUserImage}
              />
              <Text style={styles.commentUsername}>{comment.username}</Text>
            </View>
            <View style={styles.commentContent}>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
            <View style={styles.likeSection}>
              <TouchableOpacity onPress={() => handleLike(comment)}>
                <Ionicons 
                  name={comment.likes.includes(uid) ? "heart" : "heart-outline"} 
                  size={24} 
                  color={comment.likes.includes(uid) ? "red" : "black"} 
                />
              </TouchableOpacity>
              <Text style={styles.likesCount}>{comment.likes.length}</Text>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f1f1f1',
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 35,
  },
  comment: {
    marginTop: 5,
    padding: 10,
    marginBottom: 0,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  commentUsername: {
    fontSize: 14,
  },
  commentText: {
    marginTop: 5,
    fontSize: 16, // add gray background to comment content
  },
  likeSection: {
    flexDirection: 'row', // make the likes display inline
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5, // add a little space between the heart icon and the count
  },
  commentContent: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default Comments

