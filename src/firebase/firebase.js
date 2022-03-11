import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const uploadDataCollectionsDocument = async (collectionKey, data) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  data.forEach((o) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, o);
  });
  return await batch.commit();
}

export const addSingleDataToCollectionsDocument = async (collectionKey, data) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc()
  batch.set(newDocRef, data)
  return await batch.commit();
}


export const deleteSingleDataToCollectionsDocument = async (collectionKey, data) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc()
  batch.delete(newDocRef, data)
  return await batch.commit();
}

export const retrieveDataFromCollectionDocument = async (col) => {
  try {
    const colRef = collection(db, col);
    const Snapshot = await getDocs(colRef)
    return Snapshot.docs.map(doc => doc.data())
  } catch (error) {
    console.log(error)
  }
}

export const retrieveDocIdFromCollectionDocument = async (col) => {
  try {
    const colRef = collection(db, col);
    const Snapshot = await getDocs(colRef)
    return Snapshot.docs.map(doc => doc.id)
  } catch (error) {
    console.log(error)
  }
}

export const addDataToCollection = async (col, item) => {
  try {
    const colRef = collection(db, col);
    await addDoc(colRef, item)
  } catch (error) {
    console.log(error)
  }
}

export const updateDataToCollection = async (col, id, item) => {
  try {
    const itemDoc = doc(db, col, id);
    await updateDoc(itemDoc, item)
  } catch (error) {
    console.log(error)
  }
}

export const getDataFromCollection = async (col, id) => {
  try {
    const itemDoc = doc(db, col, id);
    const Snapshot = await getDoc(itemDoc)
    return Snapshot.data()
  } catch (error) {
    console.log(error)
  }

}

export const deleteDataFromCollection = async (col, id) => {
  try {
    const itemDoc = doc(db, col, id);
    await deleteDoc(itemDoc)
  } catch (error) {
    console.log(error)
  }
}

export const auth = app.auth();
export const firestore = app.firestore();
export default app
