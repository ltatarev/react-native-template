# 🥡 React Native template

## Template includes following packages with initial set up:

- `react-navigation` v5
- `react-redux/redux-toolkit/redux-persist/redux-thunk`
- `react-native-splash-screen` & `animated-splash-screen`
- `apisauce`
- `babel/eslint` (module resolver, import order...)
- GitHub PR template

## 💾 Steps after cloning

1. Update app & package names on iOS & Android
2. Update app icons & splash screen
3. Add .env file

## 🗂 Module structure

    📦 module
     ┣ 📂 assets
     ┣ 📂 components
     ┣ 📂 fragments
     ┣ 📂 hooks
     ┣ 📂 redux
     ┃ ┣ 📜 actions.js
     ┃ ┣ 📜 index.js
     ┃ ┣ 📜 slices.js
     ┃ ┣ 📜 selectors.js
     ┃ ┗ 📜 reducers.js
     ┣ 📂 screens
     ┣ 📂 services
     ┣ 📜 const.js
     ┣ 📜 index.js
     ┗ 📜 navigator.js

Each folder should have an `index.js` file which exports folder contents that are required by other modules.
Named exporting is prefered for components, and namespace export for services.

## 🗂 Setting up new project

1. Set up eslint rules and babel config
2. Set up basic project arhitecture

```
📦 src
┣ 📂 modules
┃ ┣ 📂 main
┃ ┣ 📂 ...
┃ ┗ 📜 index.js
┣ 📂 shared
┃ ┣ 📂 services
┃ ┣ 📂 hooks
┃ ┗ 📂 ...
┣ 📂 ui
┗ 📜 index.js
```

3. Add `react-native-config` and .env file
4. Add splash screen and app icons
5. Add `react-navigation`
6. Set up redux

---

Last updated: 24.7.2022
