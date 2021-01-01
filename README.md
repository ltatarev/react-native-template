## 🥡 React Native template

### Template includes packages with initial set up:

- `react-navigation` v5
- `react-redux/toolkit/persist/thunk`
- `react-native-splash-screen` & `animated-splash-screen`
- `apisauce`
- `babel/eslint` (module resolver, import order...)
- GitHub PR template

## 💾 Steps after cloning

1.  Update app & package names on iOS & Android
2.  Update app icons & splash screen
3.  Add assets to `shared/assets`
4.  Add .env file

## 🗂 Module structure

    📦 module
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

---

##### Last updated: 1.1.2021.
