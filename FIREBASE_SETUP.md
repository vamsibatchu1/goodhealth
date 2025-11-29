# Firebase Setup Instructions

Follow these steps to connect your app to Firebase:

## Step 1: Create Web App in Firebase Console

1. Go to your Firebase project homepage (you should see "Project Overview" and "Project Settings")
2. Look for the section that says **"Get started by adding Firebase to your app"** or **"Add an app to get started"**
3. Click on the **Web icon** (`</>`) - it's usually the first option
4. Register your app:
   - **App nickname**: `goodhealth-web` (or any name you prefer)
   - **Firebase Hosting**: You can check this box if you want to deploy later (optional)
5. Click **Register app**
6. You'll see your Firebase configuration object displayed. It will look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```
7. **IMPORTANT**: Copy these values - you'll need them in Step 4!

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll secure it later)
4. Select a location (choose closest to you)
5. Click **Enable**

## Step 3: Set Up Security Rules (Important!)

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to all documents (for personal use)
       // TODO: Add authentication later for better security
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
3. Click **Publish**

**Note**: For production, you should add authentication and restrict access. For now, this allows full access.

## Step 4: Add Firebase Config to Your Project

1. Copy your Firebase config from Step 1
2. Add it to `.env.local` file:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

## Step 5: Install Dependencies

Run this command in your terminal:
```bash
npm install firebase
```

## Step 6: Test the Connection

After following all steps and running `npm run dev`, the app should automatically connect to Firebase and save/load data.

## Database Structure

Your Firestore will have this structure:
```
users/
  {userId}/
    dailyData/
      {date}/  (e.g., "2025-01-27")
        weight: { weight: 65.4, date: "2025-01-27" }
        burned: { burned: 480, date: "2025-01-27" }
        food: { 
          date: "2025-01-27",
          items: [...]
        }
```

For now, we'll use a single user ID (you can add authentication later).




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo3NGuYyYQYi1oEAu0ALnJfQ4V0cn6qHM",
  authDomain: "goodhealth-bffd9.firebaseapp.com",
  projectId: "goodhealth-bffd9",
  storageBucket: "goodhealth-bffd9.firebasestorage.app",
  messagingSenderId: "414951699606",
  appId: "1:414951699606:web:92f606a84aee520fe97eb7",
  measurementId: "G-QFEVLKSCHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);