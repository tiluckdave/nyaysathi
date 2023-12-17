import { db } from '@/lib/firebase';
import { doc, getDoc, where, query, collection, getDocs, setDoc, updateDoc, addDoc, deleteDoc, } from 'firebase/firestore';

export const createUser = (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    return setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.log(error);
  }

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
  return users[ 0 ];
}

export const getUser = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userData = await getDoc(userRef);
  return userData.data();
}

export const saveFile = async (uid, nmae, url, size, isPrivate, type) => {
  const filesCollection = collection(db, 'files');
  const newFile = {
    user: uid,
    name: nmae,
    url: url,
    size: size,
    isPrivate: isPrivate,
    type: type,
  }
  await addDoc(filesCollection, newFile);
}

export const getUserFiles = async (uid) => {
  const filesCollection = collection(db, 'files');
  const q = query(filesCollection, where('user', '==', uid));
  const querySnapshot = await getDocs(q);
  const files = [];
  querySnapshot.forEach((doc) => {
    files.push(doc.data());
  });
  return files;
}




export const getCentersDb = async (state, city) => {
  try {
    console.log(state)
    console.log(city)
    const centersCollection = collection(db, 'centers');
    const q = query(
      centersCollection,
      where('state', '==', state),
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

export const updateQOTD = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists) {
      console.log('User not found');
      return;
    }
    console.log(userDoc)

    const updatedUser = await updateDoc(userRef, {
      qotd: true,
    });
    console.log('User QOTD updated successfully');
    return updatedUser;
  } catch (error) {
    console.error('Error updating user QOTD:', error.message);
  }
}


export const updateDetailsDB = async (uid, name, phone, state, city, age, gender, profession) => {
  try {

    const usersCollection = collection(db, 'users');
    console.log(usersCollection)
    const userDocRef = doc(usersCollection, uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists) {
      console.log('User not found');
      return;
    }
    console.log(userDoc)

    const updatedUser = await updateDoc(userDocRef, {
      name: name,
      phone: phone,
      state: state,
      city: city,
      age: age,
      gender: gender,
      profession: profession
    });
    console.log('User details updated successfully');
    return updatedUser;
  } catch (error) {
    console.error('Error updating user details:', error.message);
  }
};


export async function getRandomQuestion() {
  try {
    const questionsCollection = collection(db, 'questions');
    // Get all documents from the collection
    const q = query(
      questionsCollection,
    );

    const snapshot = await getDocs(q);

    // Check if there are any documents
    if (snapshot.empty) {
      console.log('No questions found in the collection.');
      return null;
    }

    // Get a random document
    const randomIndex = Math.floor(Math.random() * snapshot.size);
    const randomQuestion = snapshot.docs[ randomIndex ].data();

    // Log or process the random question
    console.log('Random Question:', randomQuestion);

    return randomQuestion;
  } catch (error) {
    console.error('Error getting random question:', error);
    return null;
  }
}

//admin functions
export const createCenter = async (title, city, state, address, phone, locationURL) => {
  const centerRef = collection(db, 'centers');
  const centerData = {
    title: title,
    address: address,
    state: state,
    city: city,
    locationURL: locationURL,
    phone: phone,
  };
  const newCenter = await addDoc(centerRef, centerData);
  console.log(newCenter.id)
  await setDoc(newCenter, { uid: newCenter.id, ...centerData })
}

export const createQuestion = async (question, options, correctOption) => {
  const questionsCollection = collection(db, 'questions');
  const questionData = {
    question: question,
    options: options,
    correct: correctOption,
  };
  const newQuestion = await addDoc(questionsCollection, questionData);
  await setDoc(newQuestion, { uid: newQuestion.id, ...questionData })
}

export const getAllQuestions = async () => {
  const questionsCollection = collection(db, 'questions');

  try {
    const querySnapshot = await getDocs(questionsCollection);
    const questions = [];

    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.uid, ...doc.data() });
    });

    return questions;
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
};
export const updateQuestionDB = async (uid, question, options, correctOption) => {
  try {
    console.log(uid)
    const questionsCollection = collection(db, 'questions');
    console.log(questionsCollection)
    const questionDocRef = doc(questionsCollection, uid);
    console.log('question doc ref : ', questionDocRef)
    const questionDoc = await getDoc(questionDocRef);
    if (!questionDoc.exists) {
      console.log('question not found');
      return;
    }
    console.log(questionDoc)

    const updatedQuestion = await updateDoc(questionDocRef, {
      question: question,
      options: options,
      correct: correctOption,
    });
    console.log('question updated successfully');
    return updatedQuestion;
  } catch (error) {
    console.error('Error updating question:', error.message);
  }
};

export const deleteQuestion = async (questionUid) => {
  const questionRef = doc(db, 'questions', questionUid);

  try {
    await deleteDoc(questionRef);
    console.log('Question deleted successfully');
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

export const getAllCenters = async () => {
  const centersCollection = collection(db, 'centers');

  try {
    const querySnapshot = await getDocs(centersCollection);
    const centers = [];

    querySnapshot.forEach((doc) => {
      centers.push({ id: doc.uid, ...doc.data() });
    });

    return centers;
  } catch (error) {
    console.error('Error getting centers:', error);
    throw error;
  }
};

export const deleteCenter = async (centerUid) => {
  const centerRef = doc(db, 'centers', centerUid);
  console.log("Hello Center", centerUid);
  try {
    await deleteDoc(centerRef);
    console.log('Center deleted successfully');
  } catch (error) {
    console.error('Error deleting center:', error);
    throw error;
  }
};

export const updateCenterDB = async (uid, title, city, state, address, phone, locationURL) => {
  try {
    console.log(uid)
    const centersCollection = collection(db, 'centers');
    console.log(centersCollection)
    const centerDocRef = doc(centersCollection, uid);
    console.log('center doc ref : ', centerDocRef)
    const centerDoc = await getDoc(centerDocRef);
    if (!centerDoc.exists) {
      console.log('center not found');
      return;
    }
    console.log(centerDoc)

    const updatedCenter = await updateDoc(centerDocRef, {
      title: title,
      city: city,
      state: state,
      address: address,
      phone: phone,
      locationURL: locationURL,
    });
    console.log('center updated successfully');
    return updatedCenter;
  } catch (error) {
    console.error('Error updating center:', error.message);
  }
};

// lawyers

export const createBasicLawyer = async (user) => {
  const LawyerRef = doc(db, 'lawyers', user.uid + user.email);
  const lawyerData = {
    uid: user.uid + user.email,
    name: user.name,
    status: "created",
    state: user.state,
    city: user.city,
    phone: user.phone,
    email: user.email,
    specialization: [],
    degree: "",
    experience: "",
    lawyerNumber: "",
    description: "",
    fees: "",
    photoURL: user.photoURL,
  };
  await setDoc(LawyerRef, lawyerData, { merge: true })
}
