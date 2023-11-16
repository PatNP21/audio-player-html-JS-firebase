import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

import Elements from "./elements/elements.js";
import Functions from "./elements/functions.js";
import Counter from "./elements/counter.js";
import FirebaseSetup from "./classes/firebase.js";
import FirebaseStorageOperations from "./classes/firebaseStorageOperations.js";

//calling the instances of classes
const firebaseSetup = new FirebaseSetup()
const elements = new Elements();
const functions = new Functions(audio);
const counter = new Counter(audio);

// Initialize Firebase
firebaseSetup.call_initializing_app();
elements.duration_progress_bar.value = 0;

//storage for the app
const storage = firebaseSetup.getMultimediaStorage()

const grid = document.getElementsByClassName("mainContent")[0]

const list_of_audios = elements.list_of_audios

elements.submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  const username = document.getElementsByClassName("username")[0].value;
  localStorage.setItem("username", username);
  let storage_operations = new FirebaseStorageOperations(localStorage.getItem("username"))
  storage_operations.getListReference()

  //list of songs from firebase storage

  const song_list_array = [];
  let check_loop = false;

  //const date = new Date();

  //duration control
  //let minutes = 0;
  //let seconds = 0;
  counter.cleanCounting()

  if (check_loop) {
    loop.style["color"] = "darkblue";
  }

  function random_ind() {
    let random_index = Math.floor(Math.random() * song_list_array.length);
    console.log(song_list_array[random_index]);
    return random_index;
  }

  listAll(listRef)
    .then((res) => {
      res.items.forEach((item) => {
        console.log(item.name);
        let lItem = document.createElement("li");
        lItem.style["width"] = "99%";
        lItem.style["margin-top"] = "1px";
        lItem.style["background-color"] = "white";
        lItem.style["border"] = "2px solid red";
        lItem.style["height"] = "5vh";
        lItem.style["text-align"] = "justify";
        lItem.style["overflow"] = "hidden";
        lItem.append(item.name);
        list_of_audios.append(lItem);
        song_list_array.push(item.name);

        lItem.addEventListener("click", () => {
          getDownloadURL(
            ref(
              storage,
              `gs://audio-js-player.appspot.com/${localStorage.getItem(
                "username"
              )}/${item.name}`
            )
          )
            .then((url) => {
              console.log(url);
              source_of_track.setAttribute("src", url);
              nameSongInput.value = item.name;
              console.log("Download has been finished successfully!");
              audio.load();
              seconds = 0;
              minutes = 0;
              audio.addEventListener("loadedmetadata", () => {
                let minutesD = Math.floor(audio.duration / 60);
                console.log(audio.duration);
                let secondsD = (
                  (Math.round(audio.duration) / 60 - minutesD) *
                  0.6
                ).toPrecision(2);

                duration.innerHTML = `${Number(minutesD) + Number(secondsD)}`;
              });

              console.log(song_list_array);
              let index = song_list_array.indexOf(item.name);
              let previousItem;
              let nextItem;
              console.log(index);

              trash.addEventListener("click", () => {
                deleteObject(ref(storage, item))
                  .then(() => {
                    console.log(
                      "The file has just been deleted from the firebase storage"
                    );
                    list_of_audios.remove(lItem);
                    song_list_array.remove(item.name);
                  })
                  .catch((err) => console.log(err));
              });

              prevTrack.addEventListener("click", () => {
                if (index >= 1 && index <= song_list_array.length - 1) {
                  previousItem = song_list_array[index - 1];
                  index = index - 1;
                }
                console.log(previousItem);

                getDownloadURL(
                  ref(
                    storage,
                    `gs://audio-js-player.appspot.com/${localStorage.getItem(
                      "username"
                    )}/${previousItem}`
                  )
                )
                  .then((url) => {
                    console.log(url);
                    source_of_track.setAttribute("src", url);
                    nameSongInput.value = previousItem;
                    console.log("Download has been finished successfully!");
                    audio.load();
                    seconds = 0;
                    minutes = 0;
                    audio.play();
                  })
                  .catch((err) => console.error(err));
              });

              nextTrack.addEventListener("click", () => {
                if (index >= 0 && index < song_list_array.length - 1) {
                  nextItem = song_list_array[index + 1];
                  index = index + 1;
                }

                getDownloadURL(
                  ref(
                    storage,
                    `gs://audio-js-player.appspot.com/${localStorage.getItem(
                      "username"
                    )}/${nextItem}`
                  )
                )
                  .then((url) => {
                    console.log(url);
                    source_of_track.setAttribute("src", url);
                    nameSongInput.value = nextItem;
                    console.log("Download has been finished successfully!");
                    audio.load();
                    seconds = 0;
                    minutes = 0;
                    audio.play();
                  })
                  .catch((err) => console.error(err));
              });

              loop_one.addEventListener("click", () => {
                check_loop = true;

                if (check_loop) {
                  loop_one.style["color"] = "darkblue";
                } else {
                  loop_one.style["color"] = "black";
                }

                getDownloadURL(
                  ref(
                    storage,
                    `gs://audio-js-player.appspot.com/${localStorage.getItem(
                      "username"
                    )}/${item.name}`
                  )
                )
                  .then((url) => {
                    console.log(url);
                    source_of_track.setAttribute("src", url);
                    nameSongInput.value = item.name;
                    console.log("Download has been finished successfully!");
                    audio.load();
                    seconds = 0;
                    minutes = 0;
                    audio.play();
                  })
                  .catch((err) => console.error(err));

                audio.addEventListener("ended", () => {
                  audio.load();
                  audio.play();
                });
              });

              loop.addEventListener("click", () => {
                check_loop = true;

                if (check_loop) {
                  loop_one.style["color"] = "darkblue";
                } else {
                  loop_one.style["color"] = "black";
                }
              });

              random.addEventListener("click", () => {
                const randomFunc = () => {
                  let random_index = random_ind();

                  getDownloadURL(
                    ref(
                      storage,
                      `gs://audio-js-player.appspot.com/${localStorage.getItem(
                        "username"
                      )}/${song_list_array[random_index]}`
                    )
                  )
                    .then((url) => {
                      console.log(url);
                      source_of_track.setAttribute("src", url);
                      nameSongInput.value = song_list_array[random_index];
                      console.log("Download has been finished successfully!");
                      audio.load();
                      seconds = 0;
                      minutes = 0;
                      audio.play();
                    })
                    .catch((err) => console.error(err));
                };

                randomFunc();

                audio.addEventListener("ended", () => {
                  randomFunc();
                });

                nextTrack.addEventListener("click", randomFunc);
                previousTrack.addEventListener("click", randomFunc);
              });
            })
            .catch((err) => console.error(err));
        });
      });
    })
    .catch((error) => {
      console.log("OOPS! Something went wrong!");
      console.error(error);
    });

  sourceBtn.addEventListener("change", (e) => {
    e.preventDefault(); //avoiding of reload the app
    source_of_track.src = URL.createObjectURL(e.target.files[0]);

    let storageRef = ref(storage, String(e.target.files[0].name)); //add the track to storage in firebase
    uploadBytes(storageRef, e.target.files[0])
      .then(() => {
        console.log(
          "Well done! This audio file has just been delivered to the storage."
        );
        nameSongInput.value = e.target.files[0].name;
        let lItem = document.createElement("li");
        let trushIcon = document.createElement("div");
        let it = document.createElement("i");
        it.setAttribute("class", "fas fa-trash-alt");
        lItem.style["width"] = "99%";
        lItem.style["margin-top"] = "1px";
        lItem.style["background-color"] = "white";
        lItem.style["border"] = "2px solid red";
        lItem.style["height"] = "5vh";
        lItem.style["text-align"] = "justify";
        lItem.append(e.target.files[0].name);
        trushIcon.appendChild(it);
        lItem.append(trushIcon);
        list_of_audios.append(lItem);
        audio.load();
        seconds = 0;
        minutes = 0;
      })
      .catch((error) => {
        console.log("OOPS!! Something went wrong!");
        console.error(error);
      });
  });

  //play audio
  elements.play.addEventListener("click", (item) => {
    //check_loop = false;
    if (audio.readyState) {
      functions.play();
    }
  });

  //pause audio
  elements.pause.addEventListener("click", () => {
    functions.pause();
  });

  //stop audio
  elements.stop.addEventListener("click", () => {
    functions.stop();
    seconds = 0;
    minutes = 0;
  });

  const timer = () => {
    const counter = new Counter();
    seconds = Math.round(audio.currentTime) - minutes * 60;
    if (seconds === 60) {
      minutes += 1;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    idcur.innerHTML = `${minutes}:${seconds}`;
  };

  audio.addEventListener("timeupdate", () => {
    duration_progress_bar.value = (audio.currentTime / audio.duration) * 100;
    setInterval(timer, 1000);
  });
});
