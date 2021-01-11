# A chat app using react and firebase.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install`

To install your packages

# Firebase

Firebase configs are added in .env file.
Create .env file in root folder and add your configs. (I've added .env.example file for reference)

Cloud functions are stored in /public directory. Currently it contains bad word detector function.

Use this to deploy your functions:

### `firebase deploy --only functions`

## bad word detector

1. Check the text for any bad words.
2. warning is given 3 times, after that user is blocked for lifetime.
