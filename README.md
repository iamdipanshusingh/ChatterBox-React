# Chatein

Chatein is a simple chating app. Made for fun.

Visit [Chatein](https://chatein-cba56.web.app/) to use the app.

## Features
- [x] One-to-one chat
- [x] Real-time messages
- [x] End-to-end encryption
- [ ] User's status
- [ ] Profile updation
- [ ] Show Last Sent message
- [ ] Send images/non-text messages
- [ ] Voice call
- [ ] Video call

## Project Setup

### Step 1 - Setup the project
- Fork the repo
- Clone your forked repo
```
git clone git@github.com:<github_username>/Chatein-React.git
```

### Step 2 - Configure Firebase project
- Create a firebase project for web
- Go to `Authentication` > `Sign-in method` and enable `Google`

### Step 3 - Configure .env
- Create a copy of `.env.example` in the root folder and name it `.env`
- Go to firebase project settings and copy the config data
- Only the last field `REACT_APP_EN_SECRET` is to be set by the developer, and can be any random string of their choice. This is used for encryption and decryption purpose.

### Step 4 - Install the dependencies and run the project
```
npm install && npm start
```
---------


Feel free to contribute

Happy Coding!
