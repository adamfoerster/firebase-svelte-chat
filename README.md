no terminal
```bash
npm install -g firebase-tools
npx degit sveltejs/template frontend-cwb
cd frontend-cwb
firebase init
npm i
npm i rxfire firebase rxjs --save
code .
npm run dev
```

index.html
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
```
crie o arquivo src/firebaseConfig.js. substitua os dados pelos corretos para o seu projeto
```js
export const firebaseConfig = {
  apiKey: "AIzaSyDUP9ngowjCNFvHPwPcxSkoNWq6C5l2IQ0",
  authDomain: "frontendcwb.firebaseapp.com",
  databaseURL: "https://frontendcwb.firebaseio.com",
  projectId: "frontendcwb",
  storageBucket: "frontendcwb.appspot.com",
  messagingSenderId: "738766646644",
  appId: "1:738766646644:web:bedf7464ce2908b1"
};
```

importações no src/App.svelte
```js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig.js";
import { authState } from "rxfire/auth";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

let user = authState(auth);
```

funções de busca e inserção de mensagens
```js
auth.signInWithRedirect(googleProvider);
// get messages
import { collectionData } from "rxfire/firestore";
import { startWith, tap, first } from 'rxjs/operators'; 
let messages = collectionData(db.collection("messages"), "id").pipe(
  startWith([]),
  tap(_ => setTimeout(_ => window.scrollTo(0,document.body.scrollHeight), 500))
);
// send message
const sendMessage = ev => {
  return user.pipe(first()).subscribe(u =>
    db
      .collection("messages")
      .doc(new Date().getTime().toString())
      .set({
        displayName: u.displayName,
        photoURL: u.photoURL,
        text: ev.detail
      })
  );
};
```
