# Client Documentation

This covers the client documentation that allows for chat between a user and their contacts.

## Table of Contents

- [💻 Development Environment](#-development-environment)
- [📄 Available Scripts](#-available-scripts)
- [🧱 Structure & organization](#-structure--organization)
- [🌠 Assets](#-assets)
- [🌍 Globals](#-globals)
- [🧊 Components](#-components)
- [🎨 Styles](#-styles)
  - [🎠 Theming](#-theming)
- [📦 Store](#-store)
  - [Entities](#entities)
  - [Users](#users)
  - [Messages](#messages)
- [🧠 To improve](#-to-improve)

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

## 🧱 Structure & organization

- `api`
  - [entity].ts
- `assets`
  - [file].(svg|jpg|png)
- `components`
  - [`component`]
    - index.scss
    - index.tsx
    - index.test.tsx
- `globals`
  - [file].ts
- `routes`
  - [`route`]
    - index.scss
    - index.tsx
- `store`
  - [`entity`]
    - index.test.ts
    - index.ts
  - `forms`
    - [`form`]
      - index.ts
- `styles`
  - [file].scss

## 🚥 api

A folder that contains all the HTTP requests for interactions with the api.

- `profile`.ts
- `contacts`.ts
- `messages`.ts

## 🌠 Assets

A folder containing visual assets for the app. This is usually a home to **fonts** and **images**.

## 🌍 Globals

Houses .ts files which are used globally thoughout the app. Currently we have:

- `const`.ts - _Global constants_
- `functions`.ts - _Utility display functions_
- `mocks`.ts - _Utility mocks for testing_
- `playSoundEffect`.ts - _A function to preload and play Sound Effects_
- `types`.ts - _Global Typescript types_

## 🧊 Components

This folder houses the components as the building blocks of the app.

Each component has:

- `index.tsx` - A TypeScript JSX file
- `index.scss` - Local styles
- `index.test.tsx` - Unit tests

## 🎨 Styles

Holds base global styles for the app. The files are split as following:

- `animations`.scss - _contains custom animations_
- `mixins`.scss - _contains utility mixins_
- `variables`.scss _all the global scss variables are stored here_

### 🎠 Theming

Each component has its' own _.scss_ file. At the very top, variables local to the component are defined which allows for easy changes without going through the entire code. For example:

#### Avatar/index.scss

<img src="https://i.ibb.co/ww9f4Kx/Screenshot-2024-06-30-at-12-09-15.png" width="300px" />

Furthermore, if you go over to **variables.scss** you will find a **Theme** section which defines theming properties for the entire app. All components are styled in a way that supports theming, so changing any of the variables in the theme section will have global changes.

For example:

\
_Default theme_

<img src="https://i.ibb.co/fNfrcj4/Screenshot-2024-06-30-at-12-12-08.png" width="370px" />
<img src="https://i.ibb.co/k6zS4ss/Screenshot-2024-06-30-at-12-11-46.png" width="500px" />

\
_Example of a black and white theme_

<img src="https://i.ibb.co/QMbjwyg/Screenshot-2024-06-30-at-12-14-41.png" width="370px" />
<img src="https://i.ibb.co/cYSK4G3/Screenshot-2024-06-30-at-12-14-32.png" width="500px" />

\
_Example of yellow and purple theme_

<img src="https://i.ibb.co/f0YdBMw/Screenshot-2024-06-30-at-12-18-14.png" width="370px" />
<img src="https://i.ibb.co/kDq0hGm/Screenshot-2024-06-30-at-12-18-03.png" width="500px" />

## 📦 Store

A **MobX** store is used to persist the data to the app.

### Entities

#### Profile:

```js
// Profile
Profile = {
  id: string,
  name: string,
  avatar: Avatar,
};

// Avatar
Avatar = number.from(0).to(15);
```

#### Contact

```js
// Contact
Contact = {
  id: string,
  profileId: string,
  name: string,
  gender: string,
  avatar: Avatar,
};

// Avatar
Avatar = number.from(0).to(15);
```

#### Message

```js
// Message
Message = {
  id: string,
  chatId: string,
  body: string,
  createdAt: string,
  sender: Sender,
  liked: boolean,
};

// Sender
Sender = number.from(User).to(Contact);

User = 0;
Contact = 1;
```

### Users

#### 🏡 Properties:

<br>

`isLoadingProfile` **bool** Default: _false_

A flag signifying when profile is being fetched/created.

<br>

`isFetchingContacts` **bool** Default: _false_

A flag signifying when contacts are being fetched from the API.

<br>

`contacts` **Contact[]** Default: _[]_

Contacts obtained from the API are stored here.

<br>

`profile` **Profile** Default: _null_

Profile loaded from the API is stored here

<br>
<br>
<br>

`contactsSearchString` **string** Default: _''_

Search string for filtering through contacts.

<br>

`existingProfileId` **string** Default: _''_

Existing profile ID from localStorage.

<br>

_get_ `filteredContacts` **Contact[]** Default: _this.contacts_

List of contacts from **this.contacts** filtered by **this.contactsSearchString**.

<br>

#### 🪛 Methods:

<br>

`createProfile`

Params:

- none

_Creates a new user profile._

<br>

`loadProfile`

Params:

- none

_Fetches an existing user profile._

<br>

`loadContacts`

Params:

- profileId `(string)` - _Current profile ID_

_Fetches a list of contacts for the profile._

<br>

`clearProfile`

Params:

- none

_Deletes the existing user profile from the store and localStorage._

<br>

### Messages

#### 🏡 Properties:

<br>

`isCreating` **bool** Default: _false_

A flag signifying when a message is being created.

<br>

`isFetching` **bool** Default: _false_

A flag signifying when messages are being fetched from the API.

<br>

`messages` **{ [key: string]: Message[] }** Default: _{}_

List of messages by chat ID.

<br>

`newMessageCount` **{ [key: string]: number }** Default: _{}_

Count of new messages by chat ID.

<br>

`isTyping` **{ [key: string]: boolean }** Default: _{}_

Typing indicator by chat ID.

<br>

`messageForm` **{ body: TextInput }** Default: _{ body: new TextInput('') }_

Form for a new message.

<br>

`ws` **WebSocket** Default: _null_

WebSocket connection for real-time messaging.

<br>

#### 🪛 Methods:

<br>

`connectWebSocket`

Params:

- none

_Handles WebSocket logic._

<br>

`createMessage`

Params:

- chatId `(string)` - _ID of the current chat_

_Sends a new message to the contact._

<br>

`loadMessages`

Params:

- chatId `(string)` - _ID of the current chat_

_Fetches all messages for the chat from the API._

<br>

`toggleLikeMessage`

Params:

- message `(Message)` - _Message to like_

_Likes/unlikes a message._

<br>

`markRead`

Params:

- chatId `(string)` - _ID of the current chat_

_Marks the chat as read._

<br>

## 🧠 To improve

### Virtualization

For contacts and messages we could either virtualize the lists or use infinite-load for optimal performance.

### Integration tests

Add integration tests to ensure consistent behavior between components.
