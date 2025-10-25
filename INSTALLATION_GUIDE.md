# Installation Guide - iPhone

## 🎯 Steps to Install on Your iPhone

### Step 1: Create Expo Account (if you don't have one)
1. Go to https://expo.dev
2. Sign up for a free account
3. Remember your username and password

### Step 2: Login to EAS
Run this in your terminal:
```bash
eas login
```
Enter your Expo username and password.

### Step 3: Configure Your Project
```bash
eas build:configure
```
Choose "Yes" when asked about creating eas.json

### Step 4: Build for iOS
```bash
eas build --platform ios --profile preview
```

**Important Notes:**
- This will take 10-20 minutes
- You'll get a link to track build progress
- The build happens on Expo's servers (no Mac needed!)

### Step 5: Install on Your iPhone

Once the build completes:

#### Method A: Direct Install (Easiest)
1. Open the build link on your iPhone
2. Tap "Install" 
3. Go to Settings → General → VPN & Device Management
4. Trust the developer profile
5. App will appear on your home screen!

#### Method B: TestFlight (More Professional)
1. Wait for build to complete
2. Download the `.ipa` file
3. Upload to App Store Connect
4. Install via TestFlight app

## 🚀 Quick Commands

```bash
# Login
eas login

# Build for iOS (Development - for testing)
eas build --platform ios --profile preview

# Build for iOS (Production - for distribution)
eas build --platform ios --profile production

# Check build status
eas build:list
```

## 📝 What You Need

✅ Expo account (free)  
✅ Internet connection  
✅ iPhone connected to WiFi  
✅ ~20 minutes for first build  

## ⚠️ Troubleshooting

**Build fails?**
- Make sure you're logged in: `eas whoami`
- Check internet connection
- Try: `eas build:configure` again

**Can't install on iPhone?**
- Make sure you enabled "Developer Mode" on iPhone (Settings → Privacy & Security)
- Trust the developer profile in Settings

**App crashes?**
- This shouldn't happen since all code is tested
- If it does, check the error logs in the EAS dashboard

## 💡 Alternative: Keep Using Expo Go

If you want to skip the build process:
1. Keep using Expo Go app
2. Scan QR code each time you want to use it
3. Works great for daily use!

The built app will:
- ✅ Work offline permanently
- ✅ Have its own icon on home screen
- ✅ Not need Expo Go
- ✅ Launch instantly like any other app
