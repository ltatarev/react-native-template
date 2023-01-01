# 🥡 React Native template

Modern React Native JS template featuring most popular libraries.

![react-native](https://user-images.githubusercontent.com/38048916/208271632-ae3887ee-0937-4985-b595-99dd78fa09dd.svg)
![redux-toolkit](https://user-images.githubusercontent.com/38048916/208271635-a6df4bda-d330-40dc-b6a1-e198bb51db8b.svg)
![react-navigation](https://user-images.githubusercontent.com/38048916/208271634-f788eb72-ca75-4c64-9c8f-adb9bbec9bd8.svg)
![eslint](https://user-images.githubusercontent.com/38048916/208271636-204c0b57-9e3c-4fa5-8743-dd4a5cb83011.svg)
![react-native-bootsplash](https://user-images.githubusercontent.com/38048916/208271633-3d511c5b-1cc3-4254-bc7a-4e5b9c416723.svg)

## 🚀 Usage

Ensure you have all [React Native dependencies](https://facebook.github.io/react-native/docs/getting-started) installed.

```sh
npx react-native init MyApp --template https://github.com/ltatarev/react-native-template.git
```

> Note: Current template works with React Native `v0.70.4`.

## 🕵️‍♀️ Libraries included

- __Redux__
    - [`redux-toolkit`](https://redux-toolkit.js.org/introduction/getting-started)
    - [`redux-persist`](https://github.com/rt2zz/redux-persist#readme)
- __Navigation__
    - [`react-navigation`](https://reactnavigation.org/docs/getting-started/) (v6)
- __Code Linting__
- __Splash Screen__
    - [`react-native-bootsplash`](https://github.com/zoontek/react-native-bootsplash)
- __Config__
    - [`react-native-config`](https://github.com/luggit/react-native-config)

## 🗂 Module structure

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

This template was made because I realized that I am bootstrapping every new React Native project equally, so I decided to put all boilerplate I often use into one place. Common steps I usually took:

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

This template proviedes all of the above steps out of the box.

---

### ⚙️ To do:

- [ ] Improve theming
- [ ] Add `react-native-config`
- [ ] Add onboarding module
- [ ] Add more commonly UI components
- [ ] Add Tab bar navigator
 
---

Last updated: 18.12.2022
