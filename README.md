# Awesome places

React Native application from the Udemy course [React Native - The Practical Guide](https://www.udemy.com/react-native-the-practical-guide/)

## This app has some major distinctions

1. All components are functional components with useState and useEffect.

2. React native navigation library has version 2.21.0. (course author recommends old v1 - the differences are huge)

3. Firebase functions has @google-cloud/storage v 2.5.0 (course author recomends old v1.7.0)

## To run this app you need

### iOS

1. git clone and cd to folder

2. npm install

3. npm run ios (maybe twice)

### Android

1. git clone and cd to folder

2. npm install

3. From image picker documentation you should add some info to the file android\build.gradle.
In our case it will be

```
ext {
    buildToolsVersion = "28.0.3"
    minSdkVersion = 19
    compileSdkVersion = 28
    targetSdkVersion = 28
    supportLibVersion = "28.0.0"
    googlePlayServicesVersion = "16.1.0"
    androidMapsUtilsVersion = "0.5+"
}
```

4. Then some undocumented magic happens - you shold add  to the end of these files:
node_modules\react-native-image-picker\android\build.gradle
node_modules\react-native-maps\lib\android\build.gradle

some info:
```
ext {
    buildToolsVersion = "28.0.3"
    minSdkVersion = 19
    compileSdkVersion = 28
    targetSdkVersion = 28
    supportLibVersion = "28.0.0"
}
```

5. npm run android (maybe twice)

## Some videos
* [Android](https://drive.google.com/open?id=1X4T0976NUwYDQFOaKi3bTUJBvwdVySzu)
* [iOS](https://drive.google.com/open?id=1vG4Wdd_3mHQbpOEiFTzSUcChziYgFCmR)
