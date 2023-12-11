import { db } from '@/lib/firebase';
import { doc, getDoc, where, query, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';

export const createUser = async (user) => {
    const userRef =  doc(db, 'users', user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
        credentials: [],
    }
    await setDoc(userRef, userData);
}

export const addCredential = async (user, credential) => {
    const userRef = doc(db, 'users', user.uid);
    const userData = await getDoc(userRef);
    const credentials = userData.data().credentials;
    credentials.push(credential);
    await updateDoc(userRef, { credentials });
}
