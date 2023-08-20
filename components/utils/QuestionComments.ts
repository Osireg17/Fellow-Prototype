import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot, query, updateDoc, arrayUnion, arrayRemove, serverTimestamp, addDoc, increment } from "firebase/firestore";
import { database } from '../../config/firebase';

export const useQuestionCommentsLogic = (postId) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    const handlePostComment = async () => {
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
            likesCount: 0,
        };

        const commentRef = collection(database, 'questions', postId, 'comments');
        addDoc(commentRef, comment);
        setCommentText('');
    }

    useEffect(() => {
        const commentsQuery = query(collection(database, 'questions', postId, 'comments'));
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            let comments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(comments);
        });
        return unsubscribe;
    }, [postId]);

    const handleLike = async (comment) => {
        const commentRef = doc(database, 'questions', postId, 'comments', comment.id);
        const isLiked = comment.likes.includes(uid);

        if (!isLiked) {
            await updateDoc(commentRef, {
                likes: arrayUnion(uid),
                likesCount: increment(1),
            });
            setComments((prevComments) =>
                prevComments.map((item) =>
                    item.id === comment.id ? { ...item, likes: [...item.likes, uid] } : item
                )
            );
        } else {
            await updateDoc(commentRef, {
                likes: arrayRemove(uid),
                likesCount: increment(-1),
            });
            setComments((prevComments) =>
                prevComments.map((item) =>
                    item.id === comment.id ? { ...item, likes: item.likes.filter((like) => like !== uid) } : item
                )
            );
        }
    }

    return {
        commentText,
        setCommentText,
        comments,
        handlePostComment,
        handleLike
    };
};
