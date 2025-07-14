
'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { 
  getAuth, 
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  type ConfirmationResult,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// --- AUTH FUNCTIONS ---

// Sign up with Email and Password
const signUpWithEmailPassword = async (email: string, password: string): Promise<FirebaseUser | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up with email and password:", error);
        throw error;
    }
};

// Sign in with Email and Password
const signInWithEmailPasswordHandler = async (email: string, password: string): Promise<FirebaseUser | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with email and password:", error);
        throw error;
    }
}
// Exporting the function with a distinct name to avoid conflicts.
export { signInWithEmailPasswordHandler as signInWithEmailPassword };


// Send Email Verification Link
const sendEmailVerificationLink = async (user: FirebaseUser): Promise<void> => {
    try {
        await sendEmailVerification(user);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

// Sign out
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// --- PHONE AUTH FUNCTIONS ---
const setupRecaptcha = (containerId: string): RecaptchaVerifier | null => {
  if (typeof window === 'undefined') return null;

  // Ensure verifier is created only once
  if (!(window as any).recaptchaVerifier) {
    const recaptchaContainer = document.getElementById(containerId);
    if (!recaptchaContainer) {
      console.error(`reCAPTCHA container with ID '${containerId}' not found in the DOM.`);
      return null;
    }
    
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log("reCAPTCHA solved, ready to send OTP");
      },
      'expired-callback': () => {
        console.warn("reCAPTCHA expired, please try again.");
      }
    });
    // Render the reCAPTCHA explicitly
    (window as any).recaptchaVerifier.render().catch((err: any) => console.error("reCAPTCHA render error:", err));
  }
  
  return (window as any).recaptchaVerifier;
};

// Send OTP to phone number
const sendOtpToPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    const appVerifier = (window as any).recaptchaVerifier;
    if (!appVerifier) {
        throw new Error("reCAPTCHA verifier not initialized. Make sure the container is visible.");
    }

    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        console.error("Error sending OTP:", error);
        // Reset reCAPTCHA on error
        appVerifier.render().then((widgetId: any) => {
            if((window as any).grecaptcha) {
                (window as any).grecaptcha.reset(widgetId);
            }
        }).catch((renderError: any) => console.error("Error resetting reCAPTCHA:", renderError));
        throw error;
    }
};

export { 
  auth, 
  signUpWithEmailPassword,
  sendEmailVerificationLink,
  signOut,
  onAuthStateChanged,
  sendOtpToPhone,
  setupRecaptcha,
  type ConfirmationResult,
  type FirebaseUser
};
