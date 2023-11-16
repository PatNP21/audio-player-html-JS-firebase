export default class Elements {
  constructor() {
    this.play = document.querySelector(".play");
    this.pause = document.querySelector(".pause");
    this.stop = document.querySelector(".stop");
    this.prevTrack = document.querySelector(".previousOne");
    this.nextTrack = document.querySelector(".nextOne");
    this.loop_one = document.querySelector(".loop-one");
    this.loop = document.querySelector(".loop");
    this.random = document.querySelector(".random");
    this.trash = document.querySelector(".trash");
    this.sourceBtn = document.querySelector("#sourceBtn");
    this.nameSongInput = document.querySelector("#songFileInputReadOnly");
    this.source_of_track = document.querySelector("#source");
    this.duration_progress_bar = document.querySelector("#bar");
    this.duration = document.querySelector("#duration");
    this.idcur = document.querySelector("#currentTime");
    this.submitBtn = document.querySelector(".submitButton");
    this.list_of_audios = document.querySelector("#list_of_audios");
  }

  //methods
  operators() {
    return {
      play: this.play,
      pause: this.pause,
      stop: this.stop,
      prevTrack: this.prevTrack,
      nextTrack: this.nextTrack,
      loop_one: this.loop_one,
      loop: this.loop,
      random: this.random,
      trash: this.trash,
      sourceBtn: this.sourceBtn,
      nameSongInput: this.nameSongInput,
      source_of_track: this.source_of_track,
      duration_progress_bar: this.duration_progress_bar,
      duration: this.duration,
      idcur: this.idcur,
      submitBtn: this.submitBtn,
      list_of_audios: this.list_of_audios
    };
  }
}
