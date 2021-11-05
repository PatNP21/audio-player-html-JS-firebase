import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";


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

//DOM buttons

const play = document.getElementsByClassName('play')[0]
const pause = document.getElementsByClassName('pause')[0]
const stopTrack = document.getElementsByClassName('stop')[0]
const prevTrack = document.getElementsByClassName('previousOne')[0]
const nextTrack = document.getElementsByClassName('nextOne')[0]
const loop = document.getElementsByClassName('loop')[0]


//DOM for source divs
const sourceBtn = document.getElementById('sourceBtn')
const nameSongInput = document.getElementById('songFileInputReadOnly')
const source_of_track = document.getElementById('source')

//storage for the app
const storage = getStorage(app)

const grid = document.getElementsByClassName('mainContent')[0]

const list_of_audios = document.getElementById('list_of_audios')
const listRef = ref(storage, 'gs://audio-js-player.appspot.com/')

//list of songs from firebase storage

const song_list_array = []
let check_loop = false

if(check_loop) {
    loop.style['color'] = 'darkblue'
}

listAll(listRef)
.then(res => {
    res.items.forEach(item => {
        console.log(item.name)
        let lItem = document.createElement('li')
        lItem.style['width'] = "99%"
        lItem.style['margin-top'] = "1px"
        lItem.style['background-color'] = "white"
        lItem.style['border'] = "2px solid red"
        lItem.style['height'] = "5vh"
        lItem.style['text-align'] = "justify"
        lItem.append(item.name)
        list_of_audios.append(lItem)
        song_list_array.push(item.name)

        lItem.addEventListener('click', () => {
            getDownloadURL(ref(storage, `gs://audio-js-player.appspot.com/${item.name}`))
            .then(url => {
                console.log(url)
                source_of_track.setAttribute('src', url)
                nameSongInput.value = item.name
                console.log("Download has been finished successfully!")
                audio.load()
                console.log(song_list_array)
                let index = song_list_array.indexOf(item.name)
                let previousItem
                let nextItem
                console.log(index)

                prevTrack.addEventListener('click', () => {

                    if(index >= 1 && index <= song_list_array.length - 1) {
                        previousItem = song_list_array[index-1]
                        index = index - 1
                    }
                    console.log(previousItem)
        
                    getDownloadURL(ref(storage, `gs://audio-js-player.appspot.com/${previousItem}`))
                    .then(url => {
                        console.log(url)
                        source_of_track.setAttribute('src', url)
                        nameSongInput.value = previousItem
                        console.log("Download has been finished successfully!")
                        audio.load()
                        audio.play()
                    }).catch(err => console.error(err))

                    
                })

                nextTrack.addEventListener('click', () => {
                    if(index >=0 && index < song_list_array.length -1) {
                        nextItem = song_list_array[index + 1]
                        index = index + 1
                    }
        
                    getDownloadURL(ref(storage, `gs://audio-js-player.appspot.com/${nextItem}`))
                    .then(url => {
                        console.log(url)
                        source_of_track.setAttribute('src', url)
                        nameSongInput.value = nextItem
                        console.log("Download has been finished successfully!")
                        audio.load()
                        audio.play()
                    }).catch(err => console.error(err))
                })

                loop.addEventListener('click', () => {
                    check_loop = true

                    if(check_loop) {
                        loop.style['color'] = 'darkblue'
                    }
                    else {
                        loop.style['color'] = 'black'
                    }

                    getDownloadURL(ref(storage, `gs://audio-js-player.appspot.com/${item.name}`))
                    .then(url => {
                        console.log(url)
                        source_of_track.setAttribute('src', url)
                        nameSongInput.value = item.name
                        console.log("Download has been finished successfully!")
                        audio.load()
                        audio.play()
                    }).catch(err => console.error(err))

                    audio.addEventListener('ended', () => {
                        audio.load()
                        audio.play()
                    })
                })

                loop.addEventListener('longclick', () => {
                    check_loop = false

                    if(check_loop) {
                        loop.style['color'] = 'darkblue'
                    }
                    else {
                        loop.style['color'] = 'black'
                    }
                })


            }).catch(err => console.error(err))
        })
    })
})
.catch(error => {
    console.log('OOPS! Something went wrong!')
    console.error(error)
})


sourceBtn.addEventListener('change', (e) => {
    e.preventDefault() //avoiding of reload the app
    source_of_track.src = URL.createObjectURL(e.target.files[0]);
    
    let storageRef = ref(storage, String(e.target.files[0].name)) //add the track to storage in firebase
    uploadBytes(storageRef, e.target.files[0])
    .then(() => {
        console.log('Well done! This audio file has just been delivered to the storage.')
        nameSongInput.value = e.target.files[0].name
        let lItem = document.createElement('li')
        lItem.style['width'] = "99%"
        lItem.style['margin-top'] = "1px"
        lItem.style['background-color'] = "white"
        lItem.style['border'] = "2px solid red"
        lItem.style['height'] = "5vh"
        lItem.style['text-align'] = "justify"
        lItem.append(e.target.files[0].name)
        list_of_audios.append(lItem)
        audio.load()
    }).catch(error => {
        console.log('OOPS!! Something went wrong!')
        console.error(error)
    })
})


//play audio
play.addEventListener('click', () => {
    check_loop = false
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
    audio.load() //played audio will play from the start
})

//choose previous track


//choose next track
