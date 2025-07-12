
'use client';

import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  onAuthStateChanged
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
const googleProvider = new GoogleAuthProvider();

// --- AUTH FUNCTIONS ---

// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return null;
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

// Setup reCAPTCHA verifier
const setupRecaptcha = (containerId: string) => {
  if (typeof window !== 'undefined') {
    // Ensure the container is empty before creating a new verifier
    const recaptchaContainer = document.getElementById(containerId);
    if (recaptchaContainer) {
        recaptchaContainer.innerHTML = '';
    }
    
    // Temporarily assign to window to avoid re-initialization errors on HMR
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved");
        }
      });
    }
    return (window as any).recaptchaVerifier;
  }
  return null;
};


// Send OTP to phone number
const sendOtpToPhone = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
  try {
    const appVerifier = setupRecaptcha('recaptcha-container');
    if (appVerifier) {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    }
    return null;
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Handle specific errors like 'auth/invalid-phone-number' if needed
    throw error;
  }
};

// Verify OTP
const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result.user;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export { 
  auth, 
  signInWithGoogle, 
  signOut,
  onAuthStateChanged,
  sendOtpToPhone,
  verifyOtp,
  setupRecaptcha,
  type ConfirmationResult
};
