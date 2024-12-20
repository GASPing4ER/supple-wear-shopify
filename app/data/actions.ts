import {push, ref, set, getDatabase} from 'firebase/database';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAoCVSm3_67GuHdTwh3_eZxBYqE8rGNDzc',
  authDomain: 'supple-wear.firebaseapp.com',
  databaseURL:
    'https://supple-wear-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'supple-wear',
  storageBucket: 'supple-wear.firebasestorage.app',
  messagingSenderId: '309393287899',
  appId: '1:309393287899:web:e723e45d2794d75706fafe',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const addNewsletterToFirebase = async (
  email: string,
): Promise<null | string> => {
  const usersRef = ref(database, 'newsletter');
  const newDataRef = push(usersRef);

  try {
    set(newDataRef, {
      email,
    });
    return null;
  } catch (error) {
    return error as string;
  }
};

export type TInquiryContact = {
  name: string;
  email: string;
  message: string;
};

export const addInquiryToFirebase = async (
  inquiry: TInquiryContact,
): Promise<null | string> => {
  const usersRef = ref(database, 'contact');
  const newDataRef = push(usersRef);

  try {
    set(newDataRef, {
      name: inquiry.name,
      email: inquiry.email,
      message: inquiry.message,
    });
    return null;
  } catch (error) {
    return error as string;
  }
};
