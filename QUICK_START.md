# Quick Start Guide

## 🚀 Get Your Salary Calculator App Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run setup
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Test on Your Phone
1. Install **Expo Go** app from App Store (iOS) or Google Play (Android)
2. Scan the QR code that appears in your terminal
3. Your app will load on your phone!

### Step 4: Test in Browser (Optional)
```bash
npm run web
```

## 📱 Building for Production

### For Android APK:
```bash
# First time setup
eas login
eas build:configure

# Build APK
npm run build:android
```

### For iOS:
```bash
# Build for iOS
npm run build:ios
```

## 🎯 What You Get

✅ **Fully Offline** - No internet required  
✅ **3 Languages** - Armenian, English, Russian  
✅ **Accurate Calculations** - Based on 2023 Armenian tax law  
✅ **Modern UI** - Clean, mobile-optimized design  
✅ **Cross-Platform** - Works on iOS and Android  

## 🔧 Troubleshooting

**App won't load?**
- Make sure your phone and computer are on the same WiFi
- Try restarting the development server: `npm start`

**Build fails?**
- Make sure you're logged in: `eas login`
- Check your internet connection
- Try: `eas build:configure`

**Need help?**
- Check the full README.md for detailed instructions
- Visit [Expo documentation](https://docs.expo.dev/)

## 🎉 You're Done!

Your salary calculator is now ready to use. The app calculates:
- Income Tax (10% IT, 20% others)
- Stamp Duty
- Pension contributions (PKS)
- Net/Gross salary conversions

All calculations work offline and are based on current Armenian tax legislation.
