import { db } from '@/lib/firebase';
import { doc, getDoc, where, query, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';

export const createUser = async (user) => {
    const userRef =  doc(db, 'users', user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
    }
    await setDoc(userRef, userData);
}