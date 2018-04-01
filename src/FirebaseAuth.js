// @flow

import type {Auth} from './types';
import type FBAuth from 'react-native-firebase/dist/modules/auth';
import type User from 'react-native-firebase/dist/modules/auth/User';
import typeof Firebase from 'react-native-firebase';

export default class FirebaseAuth implements Auth {

  firebase: Firebase;
  auth: FBAuth;

  constructor() {
    // Import here to avoid triggering side effects on import
    this.firebase = require('react-native-firebase').default;
    this.auth = this.firebase.app().auth();
  }

  jwt(): Promise<?string> {
    let unsubscribe: () => void;
    let resolve: (?string) => void;

    const callback = async (user: ?User) => {
      let token = null;
      if (user) {
        token = await user.getIdToken();
      }

      resolve(token);
      if (unsubscribe) {
        unsubscribe();
      }
    };

    return new Promise((r) => {
      resolve = r;
      unsubscribe = this.auth.onIdTokenChanged(callback);
    });
  }

  async signIn(email: string, password: string) {
    try {
      const {user} = await this.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
    } catch (error) {
      throw errorFor(error.code);
    }
  }

  onSignOut(callback: () => void) {
    return this.auth.onAuthStateChanged((user) => {
      if (!user) {
        callback();
      }
    });
  }

  async signUp(email: string, password: string) {
    try {
      const {user} = await this.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
    } catch (error) {
      throw errorFor(error.code);
    }
  }

  async emailExists(email: string) {
    let providers: Array<string>;

    try {
      providers = await this.auth.fetchProvidersForEmail(email);
    } catch (error) {
      throw errorFor(error.code);
    }

    return providers.length !== 0;
  }

  async validateEmail(email: string) {
    const emailExists = await this.emailExists(email);
    if (emailExists) {
      throw errorFor('auth/email-already-in-use');
    }
  }

  async signUpWithFacebook(accessToken: string): Promise<void> {
    const provider = this.firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(accessToken);

    try {
      const resp = await this.auth.signInAndRetrieveDataWithCredential(credential);
    } catch (error) {
      throw errorFor(error.code);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw errorFor(error.code);
    }
  }

  async signOut(): Promise<void> {
    return this.auth.signOut();
  }

  async currentEmail(): Promise<?string> {
    const user = this.auth.currentUser;
    if (!user) {
      return null;
    }

    return user.email;
  }

}

const ERR_STRINGS: {[string]: string} = {
  'auth/invalid-email': `Invalid email! Please check for typos.`,
  'auth/email-already-in-use': `You're already signed up! Please log in instead.`,
  'auth/weak-password': `Passwords must be at least 6 characters.`,
  'auth/user-disabled': `Account disabled! Contact max@findrandomevents.com for more info.`,
  'auth/user-not-found': `Couldn't find that email. Try signing up instead.`,
  'auth/wrong-password': `Wrong password! Please check for typos.`,
  'default': `Oops! Something is wrong. Please try again later.`
}

class AuthError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

function errorFor(code: string): Error {
  const message = ERR_STRINGS[code];
  if (message) {
    return new AuthError(message, code);
  }

  return new AuthError(ERR_STRINGS.default, code);
}
