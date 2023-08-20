import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Filter from 'bad-words';
import { database } from '../../config/firebase';
import { doc, getDoc, collection, onSnapshot, updateDoc, arrayUnion, arrayRemove, serverTimestamp, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { unGodlyWords } from '../../config/unGodlyWords';

export const useCommentsLogic = (postId, postType) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    const handlePostComment = async () => {
        const filter = new Filter({ list: unGodlyWords });

        if (commentText === '') {
            Alert.alert('Error', 'Please enter a comment');
            return;
        } else if (commentText.length > 200) {
            Alert.alert('Error', 'Please limit your comment to 200 characters');
            return;
        } else if (filter.isProfane(commentText)) {
            Alert.alert('Error', "Please refrain from using profanity.");
            return;
        }

        const userDoc = await getDoc(doc(database, 'user', uid));
        if (!userDoc.exists()) {
            console.error('User not found in database');
            return;
        }

        const username = userDoc.data().username;
        const userProfilePicture = userDoc.data().profilePicture;

        const comment = {
            text: commentText,
            postId: postId,
            userId: user.uid,
            createdAt: serverTimestamp(),
            username: username,
            userProfilePicture: userProfilePicture,
            likes: [],
        };

        const commentRef = collection(database, postType, postId, 'comments');
        addDoc(commentRef, comment);
        setCommentText('');
    };

    useEffect(() => {
        const commentsQuery = query(collection(database, postType, postId, 'comments'));
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            let comments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(comments);
        });
        return unsubscribe;
    }, [postId, postType]);

    const handleLike = async (comment) => {
        const commentRef = doc(database, postType, postId, "comments", comment.id);
        const isLiked = comment.likes.includes(uid);

        if (!isLiked) {
            await updateDoc(commentRef, {
                likes: arrayUnion(uid),
                likesCount: comment.likes.length + 1,
            });
            setComments((prevComments) =>
                prevComments.map((item) =>
                    item.id === comment.id ? { ...item, likes: [...item.likes, uid] } : item
                )
            );
        } else {
            await updateDoc(commentRef, {
                likes: arrayRemove(uid),
                likesCount: comment.likes.length - 1,
            });
            setComments((prevComments) =>
                prevComments.map((item) =>
                    item.id === comment.id ? { ...item, likes: item.likes.filter((like) => like !== uid) } : item
                )
            );
        }
    };

    return {
        commentText,
        setCommentText,
        comments,
        handlePostComment,
        handleLike
    };
};
