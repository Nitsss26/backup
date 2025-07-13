
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
const setupRecaptcha = (containerId: string) => {
  if (typeof window !== 'undefined') {
    const recaptchaContainer = document.getElementById(containerId);
    if (!recaptchaContainer) {
      console.error(`reCAPTCHA container with ID '${containerId}' not found in the DOM.`);
      return null;
    }
    
    // Ensure we don't create multiple verifiers
    if ((window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear();
    }
    
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': (response: any) => {
        console.log("reCAPTCHA solved, ready to send OTP");
      }
    });
    
    return (window as any).recaptchaVerifier;
  }
  return null;
};

// Send OTP to phone number
const sendOtpToPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
  const appVerifier = setupRecaptcha('recaptcha-container');
  if (!appVerifier) {
      throw new Error("reCAPTCHA verifier not initialized. Make sure the container element exists.");
  }
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    // This can happen if the phone number is invalid or for other reasons.
    // Resetting reCAPTCHA allows the user to try again.
    if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.render().then((widgetId: any) => {
            if((window as any).grecaptcha) {
                (window as any).grecaptcha.reset(widgetId);
            }
        });
    }
    throw error;
  }
};

// Verify OTP
const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string): Promise<FirebaseUser> => {
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
  signUpWithEmailPassword,
  sendEmailVerificationLink,
  signOut,
  onAuthStateChanged,
  sendOtpToPhone,
  verifyOtp,
  setupRecaptcha,
  type ConfirmationResult,
  type FirebaseUser
};
