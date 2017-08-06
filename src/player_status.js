const LoopMode = require('./loop_mode');
const State = require('./state');
const EventEmitter = require('events').EventEmitter;

module.exports = class PlayerStatus extends EventEmitter {
  constructor(
    {
      loopMode = LoopMode.NONE,
      state = State.STOPPED,
      shuffleMode = false,
      nowPlayingIdx = null
    } = {}
  ) {
    super();
    this._loopMode = loopMode;
    this._state = state;
    this._shuffleMode = Boolean(shuffleMode);
    this._nowPlayingIdx = Number(nowPlayingIdx);
  }

  get loopMode() {
    return this._loopMode;
  }

  get state() {
    return this._state;
  }

  get shuffleMode() {
    return this._shuffleMode;
  }

  get nowPlayingIdx() {
    return this._nowPlayingIdx;
  }

  toJson() {
    return {
      loopMode: this._loopMode,
      state: this._state,
      shuffleMode: this._shuffleMode,
      nowPlayingIdx: this._nowPlayingIdx
    };
  }

  play() {
    this._state = State.PLAYING;
    this._emitUpdated();
  }

  stop() {
    this._state = State.STOPPED;
    this._emitUpdated();
  }

  pause() {
    this._state = State.PAUSING;
    this._emitUpdated();
  }

  resume() {
    this._state = State.PLAYING;
    this._emitUpdated();
  }

  noLoopMode() {
    this._loopMode = LoopMode.NONE;
    this._emitUpdated();
  }

  oneLoopMode() {
    this._loopMode = LoopMode.ONE;
    this._emitUpdated();
  }

  playlistLoopMode() {
    this._loopMode = LoopMode.PLAYLIST;
    this._emitUpdated();
  }

  enableShuffleMode() {
    this._shuffleMode = true;
    this._emitUpdated();
  }

  disableShuffleMode() {
    this._shuffleMode = false;
    this._emitUpdated();
  }

  setNowPlayingIdx(idx) {
    this._nowPlayingIdx = idx;
    this._emitUpdated();
  }

  _emitUpdated() {
    this.emit('updated', this.toJson());
  }
};