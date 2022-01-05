const anime = require('animejs')

export default class Animation {
  constructor() {

  }
  test() {
    anime.timeline({
      targets: '#tester',
      easing: 'easeInOutQuad',
      duration: 5000,
      loop: true,
      direction: 'alternate'
    }).add({
      scale: [0, 1]
    }).add({
      translateY: '-100%'
    })
  }
}