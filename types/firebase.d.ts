import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const { auth, database, firestore } = firebase;

declare module 'vue/types/vue' {
  interface Vue {
    $fire: {
      auth: typeof auth;
      database: typeof database;
      firestore: typeof firestore;
    };
  }
}
