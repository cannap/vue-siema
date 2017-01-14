<template>
    <div class="siema" ref="wrap"
         @mouseleave="mouseleaveHandler"
         @mouseup="mouseupHandler"
         @mousedown="mousedownHandler"
         @mousemove="mousemoveHandler">
        <div class="inner-siema" :style="styleObject">
            <div class="siema-slide" v-for="slide in slides" v-html="slide" :style="slideStyle"></div>
        </div>
    </div>
</template>

<script>
  import SiemaSlide from './siema-slide'
  export default {
    name: 'siema-slider',
    computed: {
      slideStyle() {
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
      slides: Array,
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

    data()
    {
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

    mounted()
    {

      //Todo: Debounce
      window.addEventListener('resize', this.resize)

      if (this.draggable) {
        this.pointerDown = false
        this.drag.start = 0
        this.drag.end = 0
      }
      //Fire
      this.init();

    },

    methods: {

      init() {

        const siemaWidth = this.$refs.wrap.getBoundingClientRect().width

        this.styleObject = Object.assign({}, this.styleObject, {
          width: `${(siemaWidth / this.perPage) * this.slides.length}px`, //The Container width
          transition: `all ${this.duration}ms ${this.easing}`,
          webkitTransition: `all ${this.duration}ms ${this.easing}`,
          cursor: '-webkit-grab'
        })

        this.width = siemaWidth

      },
      clearDrag()
      {
        this.drag = {
          start: 0,
          end: 0,
        };
      },
      //TouchHandlers
      touchstartHandler()
      { },
      touchendHandler()
      { },
      touchmoveHandler()
      { },

      //MouseHandler

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
        this.styleObject.cursor = '-webkit-grab';
        this.styleObject.transition = `all ${this.duration}ms ${this.easing}`;
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

      },

      updateAfterDrag()
      {
        const movement = this.drag.end - this.drag.start
        if (movement > 0 && Math.abs(movement) > this.threshold) {
          this.prev()
        } else if (movement < 0 && Math.abs(movement) > this.threshold) {
          this.next();
        }
        this.slideToCurrent()

      },

      next()
      {
        if (this.currentSlide === this.slides.length - this.perPage && this.loop) {
          this.currentSlide = 0;
        } else {
          this.currentSlide = Math.min(this.currentSlide + 1, this.slides.length - this.perPage);
        }
        this.slideToCurrent();
      },

      prev()
      {
        if (this.currentSlide === 0 && this.loop) {
          this.currentSlide = this.slides.length - this.perPage;
        }
        else {
          this.currentSlide = Math.max(this.currentSlide - 1, 0);
        }
        this.slideToCurrent();
      },

      slideToCurrent()
      {
        this.styleObject.transform = `translate3d(-${this.currentSlide * (this.width / this.perPage)}px, 0, 0)`;
      },

      resize()
      {
        this.styleObject.width = `${(this.$refs.wrap.getBoundingClientRect().width / this.perPage) * this.innerElements.length}px`;
      },

      //Public

      goTo(index)
      {
        this.currentSlide = Math.min(Math.max(index, 0), this.slides.length - 1);
        this.slideToCurrent();
      }
    },

    beforeDestroy()
    {
      window.removeEventListener('resize', this.resize)
    },
    components: {
      SiemaSlide,
    }
  }
</script>

<style>

    .siema {
        overflow: hidden;
        width: 600px;
        margin: 0 auto;
    }

    .siema-slide {
        float: left;
    }
</style>