# Salary Calculator Mobile App

A React Native mobile app for calculating Armenian salary taxes, pension contributions, and deductions. The app works completely offline and supports multiple languages (Armenian, English, Russian).

## Features

- **Offline Functionality**: Works without internet connection
- **Multi-language Support**: Armenian, English, and Russian
- **Tax Calculations**: 
  - Income Tax (10% for IT specialists, 20% for others)
  - Stamp Duty (Servicemen's Insurance Fund)
  - Pension System (PKS) contributions
- **Bidirectional Calculation**: Calculate net from gross or gross from net
- **Modern UI**: Clean, responsive design optimized for mobile

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn**
3. **Expo CLI**: `npm install -g @expo/cli`
4. **EAS CLI** (for building): `npm install -g eas-cli`

For iOS development (optional):
- **Xcode** (for iOS simulator and building)
- **iOS Simulator** (comes with Xcode)

For Android development (optional):
- **Android Studio**
- **Android SDK**

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on device/simulator**:
   - **iOS**: `npm run ios` (requires Xcode)
   - **Android**: `npm run android` (requires Android Studio)
   - **Web**: `npm run web` (for testing in browser)

## Building for Production

### Using EAS Build (Recommended)

1. **Login to Expo**:
   ```bash
   eas login
   ```

2. **Configure your project** (if not already done):
   ```bash
   eas build:configure
   ```

3. **Build for Android**:
   ```bash
   npm run build:android
   ```

4. **Build for iOS**:
   ```bash
   npm run build:ios
   ```

5. **Build for both platforms**:
   ```bash
   npm run build:all
   ```

### Local Build (Advanced)

For local builds, you'll need to eject from Expo managed workflow:

```bash
npx expo eject
```

Then follow platform-specific build instructions in the generated `ios/` and `android/` folders.

## Project Structure

```
SalaryCalculator/
├── App.js                 # Main app entry point
├── src/
│   ├── components/
│   │   ├── SalaryCalculator.js  # Main calculator component
│   │   └── Icons.js            # Custom icon components
│   ├── constants/
│   │   └── index.js            # App constants and translations
│   └── utils/
│       └── calculations.js     # Tax calculation logic
├── assets/               # App icons and splash screens
├── app.json             # Expo configuration
├── eas.json            # EAS build configuration
└── package.json        # Dependencies and scripts
```

## Key Features Explained

### Tax Calculations

The app implements Armenian tax legislation effective from January 1, 2023:

- **Income Tax**: 10% for IT specialists, 20% for others
- **Stamp Duty**: Progressive rates based on salary brackets
- **Pension System (PKS)**: 
  - No participation (0%)
  - Voluntary (5% employee contribution, capped at 56,250 AMD)
  - Mandatory/Pre-2018 Voluntary (10% total with state matching)

### Offline Functionality

All calculations are performed locally using JavaScript. No network requests are made, ensuring the app works completely offline.

### Multi-language Support

The app supports three languages:
- **Armenian** (Հայերեն) - Default
- **English**
- **Russian** (Русский)

## Development

### Adding New Features

1. **New calculations**: Add functions to `src/utils/calculations.js`
2. **New translations**: Update `src/constants/index.js`
3. **New UI components**: Add to `src/components/`

### Testing

The app can be tested in multiple ways:

1. **Expo Go App**: Scan QR code from `npm start`
2. **iOS Simulator**: `npm run ios`
3. **Android Emulator**: `npm run android`
4. **Web Browser**: `npm run web`

## Deployment

### Android

1. Build APK using EAS: `npm run build:android`
2. Download the APK from the Expo dashboard
3. Install on Android devices (enable "Unknown Sources" in settings)

### iOS

1. Build using EAS: `npm run build:ios`
2. Download from Expo dashboard
3. Install via TestFlight or direct installation (requires Apple Developer account)

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start -c`
2. **Build failures**: Check EAS build logs in the Expo dashboard
3. **iOS build issues**: Ensure Xcode and iOS SDK are properly installed
4. **Android build issues**: Ensure Android Studio and SDK are properly configured

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Visit the [React Native documentation](https://reactnative.dev/)
- Check the [EAS Build documentation](https://docs.expo.dev/build/introduction/)

## License

This project is for educational and personal use. Please ensure compliance with local tax regulations when using for actual salary calculations.
