<script>
  import Message from "./Message.svelte";
  import CreateMessage from "./CreateMessage.svelte";
  import Login from "./Login.svelte";

  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";
  import { firebaseConfig } from "./firebaseConfig.js";
  import { authState } from "rxfire/auth";
  import { first, startWith, tap } from "rxjs/operators";
  import { collectionData } from "rxfire/firestore";

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  let user = authState(auth);

  const login = () => {
    auth.signInWithRedirect(googleProvider);
	};

  const sendMessage = ev => {
    console.log(ev);
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

  let messages = collectionData(db.collection("messages"), "id").pipe(
    startWith([]),
    tap(_ => setTimeout(_ => window.scrollTo(0,document.body.scrollHeight), 500))
  );
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" />
</svelte:head>

<div class="section">
  {#each $messages as message}
    <Message {...message} />
  {/each}
  {#if $user}
    <CreateMessage on:send={sendMessage} />
  {:else}
    <Login on:login={login} />
  {/if}
</div>
