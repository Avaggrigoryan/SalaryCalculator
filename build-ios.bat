@echo off
echo ========================================
echo  Salary Calculator - iOS App Builder
echo ========================================
echo.

echo Checking if you're logged in to Expo...
eas whoami
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo You need to login first!
    echo Run: eas login
    echo.
    pause
    exit /b 1
)

echo.
echo Starting iOS build...
echo This will take 10-20 minutes.
echo You can close this window and check progress at: https://expo.dev
echo.

eas build --platform ios --profile preview

echo.
echo ========================================
echo Build complete!
echo Check your Expo dashboard for the download link.
echo ========================================
pause
