<img src="https://i.ibb.co/1zDMMx8/Screenshot-2024-06-30-at-13-09-53.png" width="100px" />

# PD Chat

[🟢 Live Demo](https://pd-chat-dd1b96397864.herokuapp.com)

This is a simplified chat application interface using React + TypeScript. The system simulates the process of sending messages to other users, focusing on creating a user-friendly interface, managing application state, and handling user interactions effectively.

- [✨ Features](#-features)
- [💻 Development Environment](#-development-environment)
- [📄 Available Scripts](#-available-scripts)
- [📜 Documentation](#-documentation)

## 🌟 Features

ℹ️ Logo component is fragile and can not handle too many clicks.

#### ⭐️ User creation

You can create a new user or load an existing one if you are already logged in.

#### ⭐️ Avatars

Every profile and contact can pick their own avatar.

#### ⭐️ Contact Search

You can search through your contacts for easier access.

#### ⭐️ Messages

You can send and receive messages from contacts.

#### ⭐️ Message Likes

You can like received messages or receive likes on your own.

#### ⭐️ Typing Indicators

You will see when your contact is typing a message to you.

#### ⭐️ New Message Indicators

New Messages (and typing indicators) will also be displayed on a contact in the list if you are not in that chat.

#### ⭐️ Realistic Contact Reactions

A hand-made Bot Reaction mechanism was developed to simulate a real user on the other side. Your contacts can now send messages, simulate typing and even react to your messages!

#### ⭐️ Sound Effects

The app is enriched by using custom Sound Effects for key actions.

## 💻 Development Environment

This project was developed with the following environment:

- **Node** v21.7.3
- **npm** v10.5.0
- **Create React App** v5.0.1

## 📄 Available Scripts

To start the app run:

#### `npm install`

to install the required dependencies for the project.  
Once installed run:

#### `npm run start-app`

This will start both the app and the server in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

This will run tests. After running this command press `a` to run all tests for the app.

## 📜 Documentation

Both front-end and back-end have their own documentation in their respective folders:

[See Front-end Documentation](src/README.md)  
[See Back-end Documentation](server/README.md)
