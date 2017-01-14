<template>
  <div class="siema" ref="wrap"
       @mouseleave="mouseleaveHandler"
       @mouseup="mouseupHandler"
       @mousedown="mousedownHandler"
       @mousemove="mousemoveHandler"
       @touchstart="touchstartHandler"
       @touchend="touchendHandler"
       @touchmove="touchmoveHandler">
    <div class="inner-siema" :style="styleObject">
      <div class="siema-slide" v-for="slide in slides" v-html="slide" :style="slideStyle"></div>
    </div>
  </div>
</template>

<script>
  import MouseHandlers from './mixins/mouseHandler'
  export default {
    mixins: [MouseHandlers],
    name: 'siema-slider',
    computed: {
      slideStyle () {
        return {
          float: 'left',
          cssFloat: 'left',
          width: `${100 / this.slides.length}%`
        }
      }
    },

    props: {
      duration: {
        type: Number,
        default: 200
      },
      slides: {
        type: Array,
        required: true
      },
      easing: {
        type: String,
        default: 'ease-out'
      },
      perPage: {
        type: Number,
        default: 1
      },
      // Todo: find a beter name
      restartSliderAfterAdd: {
        type: Boolean,
        default: false
      },

      startIndex: {
        type: Number,
        default: 0
      },
      draggable: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'ltr'
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

    data () {
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

    mounted () {
      // Todo: Debounce

      if (this.draggable) {
        this.pointerDown = false
        this.drag.start = 0
        this.drag.end = 0
      }
      // Fire
      this.init()
      window.addEventListener('resize', this.resize)
    },

    methods: {
      init () {
        const siemaWidth = this.$refs.wrap.getBoundingClientRect().width
        this.styleObject = Object.assign({}, this.styleObject, {
          width: `${(siemaWidth / this.perPage) * this.slides.length}px`, // The Container width
          transition: `all ${this.duration}ms ${this.easing}`,
          webkitTransition: `all ${this.duration}ms ${this.easing}`,
          cursor: '-webkit-grab'
        })
        this.width = siemaWidth
      },
      clearDrag () {
        this.drag = {
          start: 0,
          end: 0
        }
      },

      updateAfterDrag () {
        const movement = this.drag.end - this.drag.start
        if (movement > 0 && Math.abs(movement) > this.threshold) {
          this.prev()
        } else if (movement < 0 && Math.abs(movement) > this.threshold) {
          this.next()
        }
        this.slideToCurrent()
      },
      next () {
        if (this.currentSlide === this.slides.length - this.perPage && this.loop) {
          this.currentSlide = 0
        } else {
          this.currentSlide = Math.min(this.currentSlide + 1, this.slides.length - this.perPage)
        }
        this.slideToCurrent()
      },

      prev () {
        if (this.currentSlide === 0 && this.loop) {
          this.currentSlide = this.slides.length - this.perPage
        } else {
          this.currentSlide = Math.max(this.currentSlide - 1, 0)
        }
        this.slideToCurrent()
      },

      slideToCurrent () {
        this.styleObject.transform = `translate3d(-${this.currentSlide * (this.width / this.perPage)}px, 0, 0)`
      },

      resize () {
        var siemaWidth = this.$refs.wrap.getBoundingClientRect().width
        this.styleObject.width = `${(siemaWidth / this.perPage) * this.slides.length}px`
        this.width = siemaWidth
        this.slideToCurrent()
      },

      // Public

      goTo (index) {
        this.currentSlide = Math.min(Math.max(index, 0), this.slides.length - 1)
        this.slideToCurrent()
      },

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
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.resize)
    },

    watch: {
      'currentSlide' (newVal, oldVal) {
        // Todo: maybe save this in data for simpler reuse
        var callbackValues = {
          currentSlide: newVal + 1,
          isFirst: newVal === 0,
          isLast: newVal + 1 === this.slides.length
        }

        this.$emit('slideChange', callbackValues)
      },
      // Reinit the slider after new slides comes in
      'slides' (newVal, oldVal) {
        this.init()
      }
    }
  }
</script>

<style>

  .siema {
    overflow: hidden;
  }

  .siema-slide {
    float: left;
  }
</style>