import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyD1HM-LY8PHws26QFCwzWp98j1pn-YuLZg",
    authDomain: "audio-js-player.firebaseapp.com",
    projectId: "audio-js-player",
    storageBucket: "audio-js-player.appspot.com",
    messagingSenderId: "612713207072",
    appId: "1:612713207072:web:c27f95e2ccfcec26d9f345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//created by Patryk Najda
//October 27th MMXXI

const play = document.getElementsByClassName('play')[0]
const pause = document.getElementsByClassName('pause')[0]
const stopTrack = document.getElementsByClassName('stop')[0]
const prevTrack = document.getElementsByClassName('previousOne')[0]
const nextTrack = document.getElementsByClassName('nextOne')[0]

//list of songs from firebase storage
const grid = document.getElementsByClassName('mainContent')[0]
const listRef = ref(storage, 'gs://audio-js-player.appspot.com/')

grid.addEventListener('load', () => {
    listAll(listRef)
    .then(res => {
        //do skończenia!!! res.prefixes.forEach()
    })
    .catch(error => {
        console.log('OOPS! Something went wrong!')
        console.error(error)
    })
})


//get source
const sourceBtn = document.getElementById('sourceBtn')
const nameSongInput = document.getElementById('songFileInputReadOnly')

sourceBtn.addEventListener('change', (e) => {
    e.preventDefault() //avoiding of reload the app
    const source_of_track = document.getElementById('source')
    source_of_track.src = URL.createObjectURL(e.target.files[0]);

    //playlist.push(e.target.files[0].name)
    let storage = getStorage(app)
    let storageRef = ref(storage, String(e.target.files[0].name)) //add the track to storage in firebase
    uploadBytes(storageRef, e.target.files[0]).then(() => {
        console.log(e.target.files[0])
        console.log('Well done! This audio file has just been delivered to the storage.')
        nameSongInput.value = e.target.files[0].name
        audio.load()
    }).catch(error => {
        console.log('OOPS!! Something went wrong!')
        console.error(error)
    })
    
    
    
})

//play audio
play.addEventListener('click', () => {
    if(audio.readyState) {
        audio.play()}
})

//pause audio
pause.addEventListener('click', () => {
    audio.pause()
})

//stop audio
stopTrack.addEventListener('click', () => {
    audio.pause()
})

//choose previous track
prevTrack.addEventListener('click', () => {
    //audio.pause()
})

//choose next track
nextTrack.addEventListener('click', () => {
    //audio.pause()
})