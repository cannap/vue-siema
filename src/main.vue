<template>
  <div id="app" class="siema" ref="wrap" @mouseleave="mouseleaveHandler" @mouseup="mouseupHandler" @mousedown="mousedownHandler" @mousemove="mousemoveHandler">

    <div class="inner-siema" ref="sliderFrame" :style="styleObject">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'siema',
    props: {
      duration: {
        type: Number,
        default: 200
      },
      easing: {
        type: String,
        default: 'ease-out'
      },
      perPage: {
        type: Number,
        default: 1
      },
      startIndex: {
        type: Number,
        default: 0
      },
      draggable: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 20
      },
      loop: {
        type: Boolean,
        default: true
      }

    },

    data() {
      return {
        styleObject: {
          transform: 'none'
        },
        width: 0,
        currentSlide: 0,
        pointerDown: true,
        drag: {
          start: 0,
          end: 0
        }
      }
    },

    mounted() {
      const siemaWidth = this.$refs.wrap.getBoundingClientRect().width
      this.styleObject = Object.assign({}, this.styleObject, {
        width: `${(siemaWidth / this.perPage) * this.$children.length}px`, //The Container width 
        transition: `all ${this.duration}ms ${this.easing}`,
        webkitTransition: `all ${this.duration}ms ${this.easing}`,
        cursor: '-webkit-grab'
      })

      this.width = siemaWidth

      //Todo: Do it more the Vue way
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].$el.style.float = 'left'
        this.$children[i].$el.style.cssFloat = 'left'
        this.$children[i].$el.style.width = `${100 / this.$children.length}%`;
      }

      if (this.draggable) {
        this.pointerDown = false
        this.drag.start = 0
        this.drag.end = 0
      }

    },

    methods: {
      clearDrag() {
        this.drag = {
          start: 0,
          end: 0,
        };
      },
      //TouchHandlers 
      touchstartHandler() { },
      touchendHandler() { },
      touchmoveHandler() { },

      //MouseHandler 

      mousedownHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        this.pointerDown = true
        this.drag.start = e.pageX
      },
      mouseupHandler(e) {
        e.stopPropagation()
        this.pointerDown = false
        this.styleObject.cursor = '-webkit-grab';
        this.styleObject.transition = `all ${this.duration}ms ${this.easing}`;
        if (this.drag.end) {
          this.updateAfterDrag()
        }

        this.clearDrag();

      },

      mousemoveHandler(e) {
        e.preventDefault()
        if (this.pointerDown) {
          this.drag.end = e.pageX
          this.styleObject.cursor = '-webkit-grabbing';
          this.styleObject.transition = `all 0ms ${this.easing}`;
          this.styleObject.transform = `translate3d(${(this.currentSlide * (this.width / this.perPage) + (this.drag.start - this.drag.end)) * -1}px, 0, 0)`
        }
      },

      mouseleaveHandler(e) {
        if (this.pointerDown) {
          this.pointerDown = false;
          this.styleObject.cursor = '-webkit-grab';
          this.drag.end = e.pageX;
          this.styleObject.transition = `all ${this.duration}ms ${this.easing}`;
          this.styleObject.webkitTransition = `all ${this.duration}ms ${this.easing}`;
          this.updateAfterDrag();
          this.clearDrag();
        }

      },

      updateAfterDrag() {
        const movement = this.drag.end - this.drag.start
        if (movement > 0 && Math.abs(movement) > this.threshold) {
          this.prev()
        } else if (movement < 0 && Math.abs(movement) > this.threshold) {
          this.next();
        }
        this.slideToCurrent()

      },

      next() {
        if (this.currentSlide === this.$children.length - this.perPage && this.loop) {
          this.currentSlide = 0;
        } else {
          this.currentSlide = Math.min(this.currentSlide + 1, this.$children.length - this.perPage);
        }
        this.slideToCurrent();
      },

      prev() {
        if (this.currentSlide === 0 && this.loop) {
          this.currentSlide = this.$children.length - this.perPage;
        }
        else {
          this.currentSlide = Math.max(this.currentSlide - 1, 0);
        }
        this.slideToCurrent();
      },

      slideToCurrent() {
        this.styleObject.transform = `translate3d(-${this.currentSlide * (this.width / this.perPage)}px, 0, 0)`;
      },
    },

  }
</script>

<style>

.siema {
  overflow:hidden; 
  width:600px;
  margin:0 auto;
}
.siema-slide {
  float:left;
}
</style>