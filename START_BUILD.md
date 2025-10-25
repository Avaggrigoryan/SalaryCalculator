# 🚀 How to Build - Step by Step

## Important: Use a Regular PowerShell Window!

The integrated terminal is having issues with interactive prompts.

### Step 1: Open Regular PowerShell

1. Press **Windows Key**
2. Type **"PowerShell"**
3. Right-click → **"Run as Administrator"** (optional, but recommended)
4. Navigate to your project:
   ```powershell
   cd D:\SalaryCalculator
   ```

### Step 2: Start the Build

```powershell
eas build --platform ios --profile preview
```

### Step 3: Answer the Questions

You'll see these prompts - here's what to answer:

#### Question 1: "Would you like to log in to your Apple account?"
**Answer: `n` (No)**

Press `n` then Enter

#### Question 2: "Generate a new Apple Distribution Certificate?"
**Answer: `Y` (Yes)** 

Press `Y` then Enter

#### Question 3: "Generate a new Apple Provisioning Profile?"
**Answer: `Y` (Yes)**

Press `Y` then Enter

### Step 4: Wait

The build will now start on Expo's servers. It takes 15-20 minutes.

You'll see:
```
✔ Build started, it may take a few minutes to complete.
Build URL: https://expo.dev/accounts/avag/projects/...
```

### Step 5: Install on iPhone

Once complete:
1. Open the build URL on your iPhone (in Safari)
2. Tap "Install"
3. Go to Settings → General → VPN & Device Management
4. Trust the profile
5. Done! 🎉

---

## 💡 Key Points

- **Say NO to Apple account** - Expo will handle everything
- **Say YES to generate certificates** - Expo creates them for free
- **No payment needed** - completely free
- **No Apple Developer account needed** - Expo provides one

---

## ❓ What If It Still Asks?

If it keeps asking about Apple account in a loop, press `Ctrl+C` to cancel, then run:

```powershell
eas build --platform ios --profile preview --non-interactive
```

This will use default answers and skip all prompts!

---

## 🎯 Quick Summary

```powershell
# 1. Open regular PowerShell (not VSCode terminal)
# 2. Navigate to project
cd D:\SalaryCalculator

# 3. Build
eas build --platform ios --profile preview

# 4. Answer:
# - Apple account? → n (No)
# - Generate certificate? → Y (Yes)
# - Generate profile? → Y (Yes)
```

That's it!
