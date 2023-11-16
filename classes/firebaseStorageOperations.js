import {
    ref,
    uploadBytes,
    listAll,
    getDownloadURL,
    deleteObject
  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import Firebase from "./abstract/Firebase.js";

export default class FirebaseStorageOperations extends Firebase {

    constructor(userId) {
      super(userId)
    }
    
}