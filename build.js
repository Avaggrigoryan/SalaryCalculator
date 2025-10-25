#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Salary Calculator Mobile App Builder');
console.log('=====================================\n');

// Check if EAS CLI is installed
try {
  execSync('eas --version', { stdio: 'ignore' });
  console.log('✅ EAS CLI is installed');
} catch (error) {
  console.log('❌ EAS CLI not found. Installing...');
  try {
    execSync('npm install -g eas-cli', { stdio: 'inherit' });
    console.log('✅ EAS CLI installed successfully');
  } catch (installError) {
    console.log('❌ Failed to install EAS CLI. Please install manually: npm install -g eas-cli');
    process.exit(1);
  }
}

// Check if user is logged in to Expo
try {
  execSync('eas whoami', { stdio: 'ignore' });
  console.log('✅ Logged in to Expo');
} catch (error) {
  console.log('❌ Not logged in to Expo. Please run: eas login');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const platform = args[0] || 'all';

console.log(`\n📱 Building for platform: ${platform}`);

// Build commands
const buildCommands = {
  android: 'eas build --platform android',
  ios: 'eas build --platform ios',
  all: 'eas build --platform all'
};

if (buildCommands[platform]) {
  try {
    console.log(`\n🔨 Starting build process...`);
    execSync(buildCommands[platform], { stdio: 'inherit' });
    console.log('\n✅ Build completed successfully!');
    console.log('📱 Check your Expo dashboard for the build status and download links.');
  } catch (error) {
    console.log('\n❌ Build failed. Check the error messages above.');
    process.exit(1);
  }
} else {
  console.log('❌ Invalid platform. Use: android, ios, or all');
  process.exit(1);
}
