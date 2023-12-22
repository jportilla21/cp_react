import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../config/firebase.config';

const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => {
  return app;
};

export const getFirestore = () => {
  return firebase.firestore(app);
};

export default firebase;

