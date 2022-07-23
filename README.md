# 🥡 React Native template

## Template includes packages with initial set up

- `react-navigation` v5
- `react-redux/redux-toolkit/redux-persist/redux-thunk`
- `react-native-splash-screen` & `animated-splash-screen`
- `apisauce`
- `babel/eslint` (module resolver, import order...)
- GitHub PR template

## 💾 Steps after cloning

1. Update app & package names on iOS & Android
2. Update app icons & splash screen
3. Add assets to `shared/assets`
4. Add .env file

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

### Each folder should have an `index.js` file which exports folder contents

---

#### Last updated: 24.7.2022
