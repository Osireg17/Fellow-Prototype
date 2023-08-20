import { Alert } from 'react-native';
import Filter from 'bad-words';
import uuid from 'react-native-uuid';
import { database } from '../../config/firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { unGodlyWords } from '../../config/unGodlyWords';

export async function postOpinion(Title, Content, postType, selectedVerses, navigation) {
    const filter = new Filter({ list: unGodlyWords });
    const goodWords = ['God']
    filter.removeWords(...goodWords)

    if (Content === "" || postType === "") {
        Alert.alert(
            "Missing information",
            "Please fill out all fields.",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        return;
    }

    if (filter.isProfane(Content) || filter.isProfane(Title)) {
        Alert.alert(
            "Profanity detected",
            "Please remove any profanity from your opinion.",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        console.log(filter.clean(Content));
        return;
    }

    if (Title.length > 30) {
        Alert.alert(
            "Title is too long",
            "Please shorten the title to 30 characters or less.",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        return;
    }

    try {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userDoc = await getDoc(doc(database, 'user', uid));
        if (!userDoc.exists()) {
            console.error('User not found in database');
            return;
        }

        const username = userDoc.data().username;
        const userProfilePicture = userDoc.data().profilePicture;

        const postData = {
            Title,
            Content,
            postType,
            BibleInformation: selectedVerses.map(verse => ({
                BibleBook: verse.book,
                BibleChapter: verse.chapter,
                BibleVerse: verse.verse,
                BibleText: verse.text,
            })),
            createdAt: serverTimestamp(),
            uid,
            praises: [],
            postId: uuid.v4(),
            username,
            userProfilePicture,
        };

        const collectionPath = postType === "public" ? "public" : "private";
        const postCollection = collection(database, collectionPath);
        const postDoc = doc(postCollection, postData.postId);

        await setDoc(postDoc, postData);

        Alert.alert(
            "Success!",
            "Your opinion has been posted.",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
        navigation.goBack();

    } catch (error) {
        console.log(error);
    }
}