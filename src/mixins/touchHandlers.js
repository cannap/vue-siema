const touchHandlers = {
  methods: {
    touchstartHandler (e) {
      e.stopPropagation()
      this.pointerDown = true
      this.drag.start = e.touches[0].pageX
    },
    touchendHandler (e) {
      e.stopPropagation()
      this.pointerDown = false
      this.styleObject.transition = `all ${this.duration}ms ${this.easing}`
      if (this.drag.end) {
        this.updateAfterDrag()
      }
      this.clearDrag()
    },

    touchmoveHandler (e) {
      e.stopPropagation()
      if (this.pointerDown) {
        this.drag.end = e.touches[0].pageX
        this.styleObject.transition = `all 0ms ${this.easing}`
        this.styleObject.transform = `translate3d(${(this.currentSlide * (this.styleObject.width / this.perPage) + (this.drag.start - this.drag.end)) * -1}px, 0, 0)`
      }
    }
  }
}

export default touchHandlers
