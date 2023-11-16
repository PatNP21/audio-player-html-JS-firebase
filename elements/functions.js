export default class Functions {
  constructor(audio) {
    this.audio_ = audio;
  }

  state = false;

  loadTrack() {
    try {
      this.audio_.load();
      this.state = true;
    } catch (err) {
      this.state = false;
      return;
    }
  }

  play() {
    return this.audio_.play();
  }

  pause() {
    return this.audio_.pause();
  }

  stop() {
    this.pause();
    this.loadTrack();
  }
}
