# Server Documentation

This covers the server documentation that allows for chat between a user and their contacts.

## Table of Contents

- [💻 Development Environment](#-development-environment)
- [📄 Available Scripts](#-available-scripts)
- [🧱 Structure & organization](#-structure--organization)
- [📊 Database](#-database)
  - [Profile](#profile)
  - [Contact](#contact)
  - [Message](#message)
- [🌍 API](#-api)
  - [Profiles](#profiles)
  - [Contacts](#contacts)
  - [Messages](#messages)
- [🤖 Bot Reactions Mechanism](#-bot-reactions-mechanism)
- [🧠 To improve](#-to-improve)
  - [Authentication](#authentication)
  - [DB Model](#db-model)
  - [Paging](#paging)

## 💻 Development Environment

The server was developed using the following modules:

- **NodeJS** v21.7.3
- **Express** v4.19.2
- **ws** 8.17.1

## 📄 Available Scripts

To start the server run the command in the root of the project:

#### `npm run server`

This will start the server on [http://localhost:8000](http://localhost:8000).

## 🧱 Structure & organization

- `api`
  - [`entity`]
    - [`endpoint`].js
- `db`
  - [`entity`]
    - [`operation`].js
- `ws`
  - [`entity`]
    - [`operation`].js
- `utils`
  - [`utilityFn`].js

The structure of the server is split into multiple layers, each serving their specific purpose.

The [**api**] layer is in charge of setting up API endpoints and handling http requests.

[**db**] layer governs over all of the database operations.

The [**ws**] layer handles WebSocket communication for specific actions.

White the [**utils**] folder holds utility functions.

## 📊 Database

For storing the data **SQLite** is used on the server side.

The database features the following models:

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
  liked: Liked,
};

// Sender
Sender = number.from(User).to(Contact);

User = 0;
Contact = 1;

// Liked
Liked = number.from(0).to(1); // Transformed to boolean in API interactions
```

## 🌍 API

The API follows the REST API principles, covering 3 routes in total.

### Profiles

Covers actions over the Profile entity.

#### `POST` /profiles

Creates a new user profile.

\
**Request body:**

| Name   | Type     | Required | Description                         |
| ------ | -------- | -------- | ----------------------------------- |
| name   | _string_ | required | _A display name for the profile_    |
| avatar | _number_ | required | _Avatar type. A number from 0 - 15_ |

\
**Response**:

```js
{
  id: string,
  name: string,
  avatar: number.from(0).to(15),
}
```

#### `GET` /profiles/${id}

Fetches an existing user profile.

\
**Request params:**

| Name | Type     | Description           |
| ---- | -------- | --------------------- |
| id   | _string_ | _A unique profile ID_ |

\
**Response**:

```js
{
  id: string,
  name: string,
  avatar: number.from(0).to(15),
}
```

### Contacts

Covers actions over the Contact entity.

#### `GET` /profiles/${profileId}/contacts

Fetches a list of contacts for the user profile.

\
**Request params:**

| Name      | Type     | Description           |
| --------- | -------- | --------------------- |
| profileId | _string_ | _A unique profile ID_ |

\
**Response**:

```js
[
  {
    id: string,
    profileId: string,
    name: string,
    gender: string,
    avatar: number.from(0).to(15),
  },
];
```

### Messages

Covers actions over the Message entity.

#### `GET` /chats/${chatId}/messages

Fetches all messages for the current chat.

\
**Request Params:**

| Name   | Type     | Description                                 |
| ------ | -------- | ------------------------------------------- |
| chatId | _string_ | _A unique chat ID between user and contact_ |

\
**Response**:

```js
[
  {
    id: string,
    chatId: string,
    body: string,
    createdAt: string,
    sender: number.from(0 /*User*/).to(1 /*Contact*/),
    liked: boolean,
  },
];
```

#### `POST` /chats/${chatId}/messages

Creates a new message in the current chat.

\
**Request Params:**

| Name   | Type     | Description                                 |
| ------ | -------- | ------------------------------------------- |
| chatId | _string_ | _A unique chat ID between user and contact_ |

\
**Request body:**

| Name   | Type     | Required | Description             |
| ------ | -------- | -------- | ----------------------- |
| body   | _string_ | required | _Message text_          |
| sender | _number_ | required | _0 - User, 1 - Contact_ |

\
**Response**:

```js
{
  id: string,
  chatId: string,
  body: string,
  createdAt: string,
  sender: number.from(0).to(1),
  liked: boolean,
};
```

#### `PUT` /chats/${chatId}/messages/${messageId}

Updates an existing message in the current chat.

\
**Request Params:**

| Name      | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| chatId    | _string_ | _A unique chat ID between user and contact_ |
| messageId | _string_ | _A unique message ID_                       |

\
**Request body:**

| Name  | Type      | Required | Description                                       |
| ----- | --------- | -------- | ------------------------------------------------- |
| body  | _string_  | optional | _Message text_                                    |
| liked | _boolean_ | optional | _Whether a message is liked by the oposing party_ |

\
**Response**:

```js
{
  id: string,
  chatId: string,
  body: string,
  createdAt: string,
  sender: number.from(0).to(1),
  liked: boolean,
};
```

## 🤖 Bot Reactions Mechanism

To ensure real time communication is achieved within the app we use websockets.

The **`POST` /chats/{chatId}/messages/{messageId}** endpoint will, upon successful message creation trigger a bot reaction.

In [generateBotResponse](server/utils/generateBotResponse.js) a configuration object will be generated determining what the contacts reaction to a message will be.

Contacts can react to a new message in the following ways:

### Contact likes message

Since we want to simulate a real user behavior as close as possible, every message will have the **LIKE_PROBABILITY** chance to be liked.  
To give a more realisting liking experience a time range (**LIKE_TIME_MIN**, **LIKE_TIME_MAX**) is used to delay the liking action.

### Contact is typing

Contact will send out a _isTyping_ event through the websocket to indicate that it started typing the message. It is sent out after **REACTION_TIME** passes (time it takes to react to a message), or in case the message is liked - after **LIKE_TIME** passes.

### Contact stops typing

A contact will send out a _isTyping = false_ event once the generator determines the time a user would have taken to type the message is passed.

It calculates **LIKE_TIME** if applicable, **REACTION_TIME**, **BOT_TYPING_SPEED_CHARS_PER_SECOND** and generated **messageBody** to determine when the message has been typed out.

### Contact sends a message

Only once the contact stops typing will a message be sent out to the user. Messages are a randomly generated lipsum with a variable number of words. The number of words will determine how fast the bot will reply.

## 🧠 To improve

### Authentication

We can add an authentication layer that will allow for multiple users once the app becomes more scalable. We would extend the server/client to support JSON web tokens for authorization and send it in a header of every http request.

### DB Model

The existing database model serves the use-case of communicating with a bot. In case of live user communication I would expect the database model to be:

- A single table for all users
  - Profiles would be fetched from this table
  - Contact objects would also be fetched from this table but with properties limited to what the user could see for a contact

### Paging

For **`GET` contacts & messages** endpoints I would add paging, so the requests don't become too large and the client can implement an infinite load or paging when fetching the data.
