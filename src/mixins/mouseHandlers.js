const mouseHandlers = {
  methods: {
    mousedownHandler(e)
    {
      e.preventDefault()
      e.stopPropagation()
      this.pointerDown = true
      this.drag.start = e.pageX
    },
    mouseupHandler(e)
    {
      e.stopPropagation()
      this.pointerDown = false
      this.styleObject.cursor = '-webkit-grab'
      this.styleObject.transition = `all ${this.duration}ms ${this.easing}`
      if (this.drag.end) {
        this.updateAfterDrag()
      }

      this.clearDrag();
    },
    mousemoveHandler(e)
    {
      e.preventDefault()
      if (this.pointerDown) {
        this.drag.end = e.pageX
        this.styleObject.cursor = '-webkit-grabbing';
        this.styleObject.transition = `all 0ms ${this.easing}`;
        this.styleObject.transform = `translate3d(${(this.currentSlide * (this.width / this.perPage) + (this.drag.start - this.drag.end)) * -1}px, 0, 0)`
      }
    },
    mouseleaveHandler(e)
    {
      if (this.pointerDown) {
        this.pointerDown = false;
        this.styleObject.cursor = '-webkit-grab';
        this.drag.end = e.pageX;
        this.styleObject.transition = `all ${this.duration}ms ${this.easing}`;
        this.styleObject.webkitTransition = `all ${this.duration}ms ${this.easing}`;
        this.updateAfterDrag();
        this.clearDrag();
      }
    }
  }
}

export default mouseHandlers
