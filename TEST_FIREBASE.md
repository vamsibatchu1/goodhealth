# Testing Firebase Connection

## Step 1: Restart Your Dev Server

Make sure your dev server is running with the new environment variables:

```bash
npm run dev
```

## Step 2: Check Browser Console

1. Open your app at `http://localhost:3000`
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Look for these messages:
   - ✅ `Firebase config loaded successfully`
   - ✅ `Project ID: goodhealth-bffd9`
   - ✅ `Firebase initialized`
   - ✅ `Firestore database initialized`

If you see any ❌ errors, check your `.env.local` file.

## Step 3: Test Adding Data

### Test 1: Add Weight
1. Click **"Add Weight"** button
2. Enter a weight (e.g., `65.4`)
3. Click **Save**
4. Check the console - should see no errors
5. The weight should appear immediately

### Test 2: Add Calories Burned
1. Click **"Add Burned Calories"** button
2. Enter calories (e.g., `480`)
3. Click **Save**
4. Check console for errors
5. Calories should appear immediately

### Test 3: Add Food Entry
1. Click **"Add Food Entry"** button
2. Try adding a food item (either LLM or Manual tab)
3. Click **"Add to Day"**
4. Check console for errors
5. Food item should appear in the list

## Step 4: Verify in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **goodhealth-bffd9**
3. Go to **Build** → **Firestore Database**
4. Click on **Data** tab
5. You should see a structure like:
   ```
   users/
     default-user/
       dailyData/
         2025-01-27/  (or today's date)
           weight: { weight: 65.4, date: "2025-01-27" }
           burned: { burned: 480, date: "2025-01-27" }
           food: { date: "2025-01-27", items: [...] }
   ```

## Step 5: Test Real-time Sync

1. Add some data in the app
2. Refresh the page
3. The data should still be there (persisted)
4. Or open the app in two browser tabs - changes in one should appear in the other

## Common Issues

### ❌ "Missing Firebase config keys"
- **Solution**: Check `.env.local` file has all `NEXT_PUBLIC_FIREBASE_*` variables
- Restart dev server after adding them

### ❌ "Firestore (9.22.3): PERMISSION_DENIED"
- **Solution**: Check Firestore Security Rules are set to allow read/write
- Go to Firestore Database → Rules tab and publish the rules

### ❌ "Failed to save..."
- **Solution**: Check browser console for specific error
- Verify Firestore database is created and enabled
- Check Security Rules allow writes

## Success Indicators ✅

- Console shows all ✅ Firebase messages
- Can add weight, calories, and food entries
- Data appears in Firebase Console
- Data persists after page refresh
- No errors in browser console

