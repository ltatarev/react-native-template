# 🥡 React Native template

Modern React Native JS template featuring most used libraries.

![react-native](https://user-images.githubusercontent.com/38048916/208271632-ae3887ee-0937-4985-b595-99dd78fa09dd.svg)
![redux-toolkit](https://user-images.githubusercontent.com/38048916/208271635-a6df4bda-d330-40dc-b6a1-e198bb51db8b.svg)
![react-navigation](https://user-images.githubusercontent.com/38048916/208271634-f788eb72-ca75-4c64-9c8f-adb9bbec9bd8.svg)
![eslint](https://user-images.githubusercontent.com/38048916/208271636-204c0b57-9e3c-4fa5-8743-dd4a5cb83011.svg)
![react-native-bootsplash](https://user-images.githubusercontent.com/38048916/208271633-3d511c5b-1cc3-4254-bc7a-4e5b9c416723.svg)

## :arrow_forward: Usage

```sh
npx react-native init MyApp --template https://github.com/ltatarev/react-native-template.git
```

### Template includes following packages with initial set up

- `react-navigation` v6
- `react-redux/redux-toolkit/redux-persist`
- `react-native-bootsplash`
- `react-native-config`
- `babel/eslint` (module resolver, import order...)
- GitHub PR template

### 🗂 Module structure

```md
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
```

Each folder has an `index.js` which exports folder contents that are required by other modules.
Named exporting is prefered for components, and namespace export for services.

## 🗂 Setting up new project

1. Set up eslint rules and babel config
2. Set up basic project arhitecture

```md
📦 src
┣ 📂 assets
┣ 📂 modules
┃ ┣ 📂 main
┃ ┣ 📂 ...
┃ ┗ 📜 index.js
┣ 📂 common
┃ ┣ 📂 services
┃ ┣ 📂 hooks
┃ ┗ 📂 ...
┣ 📂 ui
┗ 📜 index.js
```

3. Add `react-native-config` and .env file
4. Add splash screen and app icons
   - [appicon.co](https://appicon.co/)
   - [Android asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
   - [RN Bootsplash](https://github.com/zoontek/react-native-bootsplash)
5. Add `react-navigation`
6. Set up redux

---

#### To do:

- [] Improve theme

Last updated: 17.12.2022
