# 📱 Install via USB Cable

## Method 1: Using 3uTools (Windows - Recommended)

### Step 1: Build the IPA
```powershell
eas build --platform ios --profile preview
```
Wait 15-20 minutes, then download the `.ipa` file from the link.

### Step 2: Install via Cable
1. **Download 3uTools** from http://www.3u.com/
2. **Install 3uTools** on your PC
3. **Connect iPhone** via USB cable
4. **Open 3uTools**
5. **Go to "Apps"** tab
6. **Click "Install"** and select your `.ipa` file
7. Done! 🎉

---

## Method 2: Using iMazing (Windows/Mac)

### Step 1: Build the IPA (same as above)
```powershell
eas build --platform ios --profile preview
```

### Step 2: Install via iMazing
1. **Download iMazing** from https://imazing.com/
2. **Install and open iMazing**
3. **Connect iPhone** via cable
4. **Click "Manage Apps"**
5. **Drag and drop** the `.ipa` file
6. Done! 🎉

---

## Method 3: Using iTunes Alternative - AltStore

This method doesn't require downloading the IPA first!

### Requirements:
- Windows PC or Mac
- iPhone connected via cable
- iTunes installed (Windows) or just cable (Mac)

### Steps:
1. **Download AltStore** from https://altstore.io/
2. **Install AltStore** on your PC
3. **Install AltStore app** on your iPhone (follow their guide)
4. **Connect iPhone** via cable
5. **In AltStore**, you can sideload apps directly

---

## Method 4: Expo Development Build (No Cable Needed!)

Actually, you **don't need a cable at all**! This is easier:

### Steps:
1. **Build the app:**
   ```powershell
   eas build --platform ios --profile preview
   ```

2. **Get the link** from the build output

3. **Open the link on your iPhone** (in Safari)

4. **Tap "Install"**

5. **Trust the profile:**
   - Settings → General → VPN & Device Management
   - Tap the profile → Trust

6. Done! No cable needed! 🎉

---

## 🎯 Recommended Approach

**Easiest (No Cable):** Method 4 - Just open the build link on your iPhone  
**Cable Required:** Method 1 - 3uTools (free and simple)  
**Most Professional:** Method 2 - iMazing  
**Most Flexible:** Method 3 - AltStore  

---

## 💡 Important Notes

- **All methods work without Apple Developer account**
- **Development builds last 7 days** (then rebuild)
- **App works 100% offline** once installed
- **No jailbreak needed**
- **Completely legal and safe**

---

## 🚀 Quick Start

**Don't have any tools yet?**

Just use **Method 4** (no cable needed):
```powershell
eas build --platform ios --profile preview
```

Then open the link on your iPhone Safari and install!

It's literally the easiest way! 😊
