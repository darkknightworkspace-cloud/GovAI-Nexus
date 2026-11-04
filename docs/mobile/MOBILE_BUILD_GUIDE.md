# GovAI Nexus – React Native & Expo Mobile Build Guide
**Android APK/AAB & iOS IPA Compilation & Deployment Runbook**

---

## 1. Mobile Technology Stack

- **Framework**: React Native 0.74+ with Expo SDK 51+
- **Language**: TypeScript
- **Routing**: Expo Router (File-based navigation)
- **State Management**: Zustand
- **Local Storage**: AsyncStorage with AES encrypted sensitive tokens
- **Target OS**: Android 8.0+ (API Level 26+) and iOS 14.0+

---

## 2. Directory Structure (`/mobile`)

```
/mobile
├── app/                  # Expo router screens (onboarding, login, citizen dashboard, ai assistant)
├── components/           # Mobile UI design components (Header, Cards, VoiceMic, DocumentPicker)
├── services/             # REST API connector calling FastAPI `/api/v1/mobile/*`
├── app.json              # Expo application manifest, package names, permissions
└── package.json          # Mobile dependencies
```

---

## 3. Local Development & Testing

```bash
cd mobile
npm install
# Start Expo development bundler
npx expo start
```
- Press `a` to run on connected Android emulator or device.
- Press `i` to run on iOS Simulator (macOS required).
- Scan QR code using the Expo Go app for physical device testing.

---

## 4. Production Binary Build via EAS (Expo Application Services)

### 4.1 Android Production Build (.aab)
```bash
eas build --platform android --profile production
```
- Output: Google Play Store compliant Android App Bundle (`.aab`) with Proguard obfuscation and signed with release keystore.

### 4.2 iOS Production Build (.ipa)
```bash
eas build --platform ios --profile production
```
- Output: Apple App Store compliant IPA signed with Apple Developer Enterprise certificate.

---

## 5. Offline Capabilities & Permissions

- **Offline Mode**: Network status listener automatically queues offline draft applications in encrypted local SQLite/AsyncStorage and synchronizes automatically upon reconnecting to 4G/5G/Wi-Fi.
- **Declared Permissions**:
  - `CAMERA`: Document capture and certificate scanning.
  - `RECORD_AUDIO`: Voice AI queries in Tamil and English.
  - `ACCESS_FINE_LOCATION`: Identifying nearest e-Sevai / Taluk centers.
