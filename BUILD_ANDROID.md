# 🤖 Build Android APK - Simple Guide

## ✅ Good News: Android is EASY!

No account needed, no payment, installs permanently!

---

## 🚀 Step-by-Step Instructions

### Step 1: Open Regular PowerShell

1. Press **Windows Key**
2. Type **"PowerShell"**
3. Press **Enter**
4. Navigate to your project:
   ```powershell
   cd D:\SalaryCalculator
   ```

### Step 2: Build the APK

```powershell
eas build --platform android --profile preview
```

### Step 3: Answer the Question

You'll see:
```
? Generate a new Android Keystore? »
```

**Answer: `Y` (Yes)**

Press `Y` then Enter

That's it! The build will start.

---

## ⏱️ What Happens Next

1. **Build starts** on Expo's servers (takes 10-15 minutes)
2. **You get a link** like: `https://expo.dev/accounts/avag/projects/...`
3. **Download the APK** from the link
4. **Install on Android** - just tap the APK file!

---

## 📱 How to Install the APK

### On Android Phone:

1. **Download the APK** from the build link on your Android phone
2. **Tap the APK file** to install
3. If asked, **enable "Install from Unknown Sources"**
4. Done! App appears in your app drawer 🎉

### On Android Emulator:

1. **Download the APK** to your PC
2. **Drag and drop** the APK onto the emulator
3. Done! App installs automatically

---

## ✅ What You Get

After installation:
- ✅ Permanent app (never expires!)
- ✅ Works 100% offline
- ✅ Has app icon on home screen
- ✅ No time limits
- ✅ No developer account needed
- ✅ Completely free
- ✅ Can share with friends!

---

## 🎯 Quick Commands

```powershell
# Build APK
eas build --platform android --profile preview

# Check build status
eas build:list

# Download latest build
# (Go to expo.dev and download from dashboard)
```

---

## 📤 Sharing Your App

You can share the APK with anyone!

1. **Upload to Google Drive** or cloud storage
2. **Share the link**
3. **They download and install** - works on any Android!

No Google Play Store needed for personal apps.

---

## 💡 Pro Tip

Want to test on Android emulator first?

1. **Download Android Studio** (free)
2. **Create an emulator**
3. **Drag APK onto emulator**
4. Test before installing on real phone!

---

## 🚀 Ready? Do This Now:

1. **Open regular PowerShell** (not VSCode terminal)
2. **Navigate:** `cd D:\SalaryCalculator`
3. **Build:** `eas build --platform android --profile preview`
4. **Answer:** `Y` when asked about keystore
5. **Wait 10-15 minutes**
6. **Download APK** from the link
7. **Install and enjoy!** 🎉
