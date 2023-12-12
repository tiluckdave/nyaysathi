import { db} from '@/lib/firebase';
import { doc, getDoc, where, query, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';



export const createUser = async (user) => {
    const userRef =  doc(db, 'users', user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        password: user?.password ? user.password : user.uid,
        name: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
        credentials: [],
    }
    await setDoc(userRef, userData);
}

export const addCredential = async (user, credential) => {
    const userRef = doc(db, 'users', user);
    const userData = await getDoc(userRef);
    const credentials = userData.data().credentials;
    credentials.push(credential);
    await updateDoc(userRef, { credentials });
}

export const findOneByEmail = async (email) => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    }
    );
    return users[0];
}

export const getUser = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userData = await getDoc(userRef);
    return userData.data();
}


export const createCenter = async (center) => {
    const centerRef =  doc(db, 'centers',center.uid);
    const centerData = {

        uid: center.uid,
        title: center.title,
        address: center.address,
        state: center.state,
        city: center.city,
        locationURL: center.locationURL,
    }
    await setDoc(centerRef, centerData);
}

export const getCentersDb = async (state , city) => {
    try {
        console.log(state)
        console.log(city)
      const centersCollection = collection(db, 'centers');
      const q = query(
        centersCollection,
        where('state', '==',state ),
        where('city', '==', city)
      );
  
      const querySnapshot = await getDocs(q);
      
      const centers = [];
      querySnapshot.forEach((doc) => {
        // Add each document's data to the centers array
        centers.push({ id: doc.id, ...doc.data() });
      });
  
      return centers;
    } catch (error) {
      console.error("Error fetching centers: ", error);
      // Handle the error as needed
      return [];
    }
  };
