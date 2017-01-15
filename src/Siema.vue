<template>
    <div class="siema" v-if="draggable" style="overflow:hidden" ref="wrap"
         @mouseleave="mouseleaveHandler"
         @mouseup="mouseupHandler"
         @mousedown="mousedownHandler"
         @mousemove="mousemoveHandler"
         @touchstart="touchstartHandler"
         @touchend="touchendHandler"
         @touchmove="touchmoveHandler">
        <div class="inner-siema" :style="styleObject">
            <div class="siema-slide" :class="{'active': index === currentSlide}" v-for="(slide,index) in slides"
                 v-html="slide"
                 :style="slideStyle"></div>
        </div>
    </div>
    <!-- No DraggHandler -->
    <div class="siema" v-else style="overflow:hidden" ref="wrap">
        <div class="inner-siema" :style="styleObject">
            <div class="siema-slide"
                 :class="{'active': index === currentSlide}"
                 v-for="(slide,index) in slides"
                 v-html="slide"
                 :style="slideStyle">
            </div>
        </div>
    </div>

</template>

<script>
  import MouseHandlers from './mixins/mouseHandler'
  import TouchHandlers from './mixins/touchHandler'
  import debounce from 'lodash.debounce'
  export default {
    mixins: [MouseHandlers, TouchHandlers],
    name: 'siema-slider',
    computed: {
      slideStyle () {
        return {
          float: 'left',
          cssFloat: 'left',
          width: `${100 / this.slides.length}%`
        }
      },
      transition () {
        return `all ${this.duration}ms ${this.easing}`
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
        default: true
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
        pointerDown: false,
        drag: {
          start: 0,
          end: 0
        }
      }//
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
    },

    created() {
      window.addEventListener('resize', this.resize)

    },
    methods: {

      init () {
        const siemaWidth = this.$refs.wrap.getBoundingClientRect().width

        const styleToMerge = {
          width: `${(siemaWidth / this.perPage) * this.slides.length}px`, // The Container width
          transition: this.transition,
          webkitTransition: this.transition,
          cursor: '-webkit-grab'
        }

        this.styleObject = Object.assign({}, this.styleObject, styleToMerge)
        this.currentSlide = this.startIndex
        this.width = siemaWidth
        this.$emit('slideChange', this.currentSlide)
        this.slideToCurrent()
      },
      clearDrag () {
        this.drag = {
          start: 0,
          end: 0
        }
      },

      updateAfterDrag ()
      {
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
        if (this.newSlide) {
          this.styleObject.transition = this.transition
          this.styleObject.webkitTransition = this.transition
          this.newSlide = false
        }

        this.styleObject.transform = `translate3d(-${this.currentSlide * (this.width / this.perPage)}px, 0, 0)`
      },

      resize: debounce(function () {
        var siemaWidth = this.$refs.wrap.getBoundingClientRect().width
        console.log(siemaWidth);
        this.styleObject.width = `${(siemaWidth / this.perPage) * this.slides.length}px`
        this.width = siemaWidth
        this.slideToCurrent()
      }, 250),

      // Public

      goTo (index) {
        this.currentSlide = Math.min(Math.max(index, 0), this.slides.length - 1)
        this.slideToCurrent()
      },

      beforeDestroy () {
        window.removeEventListener('resize', this.resize)
      }
    },
    watch: {
      'currentSlide' (newVal, oldVal)
      {
        this.$emit('slideChange', newVal)
      },
      // Reinit the slider after new slides comes in
      'slides' (newVal)
      {

        this.init(true)
      }
    }
  }
</script>