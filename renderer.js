// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

import AudioAnalyzer from './js/AudioAnalyzer.js'
import Animation from './js/Animation.js'
const { ipcRenderer } = require('electron')

class Renderer {
  constructor() {
    this.audioAnalyzer = new AudioAnalyzer() 
    this.animation = new Animation()

    this.audio = this.audioAnalyzer.audio

    this.handleUpdate = this.handleUpdate.bind(this)

    this.state = {
      currentTime: 0,
      currentScene: 0
    }

    this.scenes = [
      {
        time: 1,
        action: () => { 
          this.animation.test() 
        }
      },
      {
        time: 6,
        action: () => { console.log('second') }
      }
    ]

    this.init()
  }

  init() {
    this.updater = requestAnimationFrame(this.handleUpdate)
    this.audio.play()
  }

  handleUpdate() {
    if (this.scenes.length) {
      if (this.audio.currentTime >= this.scenes[0].time) {
        this.scenes[0].action() 
        this.scenes = this.scenes.slice(1)
      }
      this.updater = requestAnimationFrame(this.handleUpdate)
    } else {
      cancelAnimationFrame(this.updater)
    }
  }

  quitApp() {
    ipcRenderer.send('quit')
  }
}

new Renderer()
