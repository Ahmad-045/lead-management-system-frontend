import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: 'AIzaSyBxsJKrkl-EJEH-LXyfTyD4RKIdT-5bcTo',
  authDomain: 'image-upload-4b767.firebaseapp.com',
  projectId: 'image-upload-4b767',
  storageBucket: 'image-upload-4b767.appspot.com',
  messagingSenderId: '601151424094',
  appId: '1:601151424094:web:cc71e654b3d7716c1596cf',
});

const storage = getStorage(app);
export default storage;
