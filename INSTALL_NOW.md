# 📱 Install on iPhone - Simple Guide

## ✅ You're Already Logged In!

Good news: You're logged in as "avag" to Expo!

## 🚀 Two Ways to Install (Pick One):

---

### **Method 1: Install Directly (NO Apple Developer Account)**

This is the **EASIEST** way and requires **NO Apple account**!

#### Step 1: Open PowerShell and run:
```powershell
eas build --platform ios --profile preview
```

#### Step 2: Wait 15-20 minutes
- The build happens on Expo's cloud servers
- You'll get a link like: `https://expo.dev/accounts/avag/projects/...`
- You can close the terminal and check progress at expo.dev

#### Step 3: Install on iPhone
1. **Open the link on your iPhone** (in Safari)
2. Tap **"Install"** button
3. Go to **Settings** → **General** → **VPN & Device Management**
4. Find the profile and tap **"Trust"**
5. Done! App appears on home screen! 🎉

**This works for 7 days**, then you need to rebuild (or just keep using Expo Go!)

---

### **Method 2: Keep Using Expo Go (EASIEST)**

Just keep scanning the QR code!
- ✅ Works forever
- ✅ No building needed
- ✅ Updates instantly
- ❌ Need Expo Go app installed
- ❌ Need to scan QR each time

---

## 🎯 Recommended: Use Method 1 Now!

**Run this command in PowerShell:**

```powershell
eas build --platform ios --profile preview
```

Then wait for the build to finish and install from the link!

---

## ❓ FAQ

**Q: Do I need an Apple Developer account?**  
A: NO! Method 1 works without any Apple account. It's 100% free.

**Q: Will the app work offline?**  
A: YES! Once installed, it works completely offline.

**Q: How long does it last?**  
A: The free development build lasts 7 days. After that, rebuild or use Expo Go.

**Q: Can I distribute to others?**  
A: With Method 1, only you can install (up to 100 devices). For App Store distribution, you'd need an Apple Developer account ($99/year).

**Q: What if the build fails?**  
A: Check the Expo dashboard for error logs. Usually it works first try!

---

## 🎉 Ready? Run This Now:

Open PowerShell in your project folder and paste:

```powershell
eas build --platform ios --profile preview
```

That's it! I'll help if you get stuck.
