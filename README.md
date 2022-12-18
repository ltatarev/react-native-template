# 🥡 React Native template

![react-native](https://user-images.githubusercontent.com/38048916/208271632-ae3887ee-0937-4985-b595-99dd78fa09dd.svg)
![react-native-bootsplash](https://user-images.githubusercontent.com/38048916/208271633-3d511c5b-1cc3-4254-bc7a-4e5b9c416723.svg)
![react-navigation](https://user-images.githubusercontent.com/38048916/208271634-f788eb72-ca75-4c64-9c8f-adb9bbec9bd8.svg)
![redux-toolkit](https://user-images.githubusercontent.com/38048916/208271635-a6df4bda-d330-40dc-b6a1-e198bb51db8b.svg)
![eslint](https://user-images.githubusercontent.com/38048916/208271636-204c0b57-9e3c-4fa5-8743-dd4a5cb83011.svg)

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

Each folder should have an `index.js` file which exports folder contents.
---

##### Last updated: 15.7.2021.
