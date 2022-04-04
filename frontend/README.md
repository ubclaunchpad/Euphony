## Android's Production Build
### First time building?
Building Euphony and uploading it to Google Play will require a signed keystore in `./android/keystore.properties`. It must contain `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_STORE_PASSWORD`, and `MYAPP_UPLOAD_KEY_PASSWORD`. Victor has the credentials for the keystore, stored in `./android/app/******.keystore`.

### To generate a new build
First, test the release build and test it thoroughly. Uninstall any previous version of the app you already have installed, or the local production build will break.
```
npx react-native run-android --variant=release
```

Once you have checked thoroughly, then you can compile the release AAB (Android App Bundle).
```
cd android
./gradlew bundleRelease
```

The generated AAB can be found under `android/app/build/outputs/bundle/release/app-release.aab`, and is ready to be uploaded to Google Play.



Sources:

https://reactnative.dev/docs/signed-apk-android

https://stackoverflow.com/questions/59528262/generate-release-apk-in-react-native 