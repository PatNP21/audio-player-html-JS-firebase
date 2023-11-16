export default class Counter {
  constructor(audio) {
    this.audio_ = audio;
  }

  minutes;
  seconds;

  getDurationForTrack() {
    this.seconds = Math.round(this.audio_.currentTime) - this.minutes * 60;
    if (this.seconds === 60) {
      minutes += 1;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    console.log(this.minutes, ":", this.seconds);
  }

  getDurationForPlaylist() {}

  cleanCounting() {
    this.seconds = 0;
    this.minutes = 0;
  }
}
