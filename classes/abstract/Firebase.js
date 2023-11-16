import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
    getStorage,
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
    deleteObject
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

export default class Firebase {

    constructor(userId) {
        if(this.constructor == Firebase) {
            throw new Error("The Firebase class is destinated to be extended by other classes only.")
        }
        this.userId_ = userId
    }

    firebaseConfig = {
        apiKey: "AIzaSyD1HM-LY8PHws26QFCwzWp98j1pn-YuLZg",
        authDomain: "audio-js-player.firebaseapp.com",
        projectId: "audio-js-player",
        storageBucket: "audio-js-player.appspot.com",
        messagingSenderId: "612713207072",
        appId: "1:612713207072:web:c27f95e2ccfcec26d9f345",
    };

    storageAddress = `gs://audio-js-player.appspot.com/${this.userId_}`

    call_initializing_app() {
        return initializeApp(this.firebaseConfig)
    }

    getMultimediaStorage() {
        return getStorage(this.call_initializing_app())
    }

    getListReference() {
        return ref(
            this.getMultimediaStorage(),
            this.storageAddress
          )
    }

    getElementsList() {
        return listAll(this.getListReference)
    }
}