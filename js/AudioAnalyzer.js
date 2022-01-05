export default class AudioAnalyzer {
  constructor() {
    this.audio = document.getElementById('audio')
    this.getPeak = this.getPeak.bind(this)
    this.setup()
  }

  setup() {
    const ctx = new AudioContext()
    this.analyser = ctx.createAnalyser()
    this.analyser.fftSize = 512
    this.analyser.smoothingTimeConstant = 0.5

    const sourceNode = ctx.createMediaElementSource(this.audio)
    sourceNode.connect(this.analyser)
    this.analyser.connect(ctx.destination)
  }

  getPeak() {
    const freqArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(freqArray)
    const peak_frequency = Math.max.apply(null, freqArray)
    const average = (freqArray.reduce((a, b) => a + b, 0) / freqArray.length)
    const brightness = 3.5 //1 - 5 depending on room brightness
    const peak = Math.floor(average * brightness) //Math.floor(peak_frequency)
    return Math.floor(peak_frequency)
  }
}