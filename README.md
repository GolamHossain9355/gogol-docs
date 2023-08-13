# Google Docs Clone

A Google Docs clone project that allows users to create and collaborate on documents in real time. This project is built using [React](https://reactjs.org/), [Firebase](https://firebase.google.com/), and [Socket.io](https://socket.io/).

## Table of Contents

-  [Features](#features)
-  [Demo](#demo)
-  [Getting Started](#getting-started)
-  [Technologies](#technologies)
-  [Contributing](#contributing)
-  [License](#license)

## Features

-  Sign in with Google account for authentication.
-  Create and edit documents using a react-quill.
-  Real-time collaboration allows multiple users to edit the same document simultaneously.
-  Data persistence using Firestore to save and retrieve documents.
-  Secure authentication and authorization using Firebase Auth.

## Demo

Provide a link to a live demo of your project if available. Include screenshots or GIFs that showcase the key features of your app.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/GolamHossain9355/gogol-docs.git`
2. Install dependencies: `npm install`
3. Set up Firebase:
   -  Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   -  Add your Firebase config to the project.
4. Start the development server: `npm start`
5. Open your browser and go to `http://localhost:5173`.

## Usage

Welcome to the Google Docs Clone! This section will guide you through the steps to make the most of this collaborative document editing platform.

Authentication:
Upon accessing the app, you'll encounter the sign-up or sign-in page. Click the prominent Google Sign In button and provide your Google email and password for authentication. This ensures secure access to the app's features.

Home Page:
After signing in, you'll be directed to the home page. Here, you'll find a comprehensive overview of all your previously created documents. Each document is represented by its title, giving you an organized view of your work.

Creating a Document:
To initiate a new document, simply click the "Add Document" button prominently displayed on the page. Assign a suitable title to your document, and you're all set to begin composing your content.

Text Editor:
When you select a document, the app seamlessly takes you to the text editor page. Your document's previous content is effortlessly loaded from the database, providing a foundation for your edits. Feel free to shape and refine your content according to your requirements.

Auto-Save Feature:
As you work on your document, the app's auto-save feature diligently ensures your progress is preserved. The text is automatically saved after 1000ms of inactivity, providing peace of mind even during moments of reflection or temporary disengagement.

Real-Time Collaboration:
One of the standout features of this app is real-time collaborative editing. Leveraging the power of socket.io, multiple users can edit the same document simultaneously. To experience this, open an incognito window, sign in with a different account, and witness the seamless synchronization as multiple editors contribute to the same document.

Logging In and Out:
To maintain the app's functionality, it's essential to remain logged in. Logging out will direct you back to the sign-in page, allowing you to reauthenticate swiftly and resume your work with ease.

Whether you're creating documents solo or collaborating in real-time with others, the Google Docs Clone offers a user-friendly and efficient platform for all your document editing needs.

## Reflection

Reflect on your development journey and share your insights:

-  Challenges you faced and how you overcame them.
-  What you learned while working on the project.
-  Any technologies or techniques you found particularly valuable.

## Technologies

-  React
-  Firebase
-  Socket.io

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
