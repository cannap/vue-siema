<template>
    <div id="app" class="component">
        <Siema ref="slider" :loop="loop" :startIndex="currentSlide" :slides="slides" @slideChange="slideChanged">
        </Siema>
        <div class="controls">
            Current Slide:
            <pre> {{currentSlide}} </pre>
            <div class="buttons">
                <button type="button" :disabled="buttons.prev" @click="prev">Prev</button>
                <button type="button" :disabled="buttons.next" @click="next">Next</button>
                <br>
                <button type="button" @click="addSlide">Add New Slide</button>
            </div>
        </div>
        <input type="number" v-model="sliderIndex">
        <button class="btn" @click="goTo(sliderIndex)">Go To</button>
    </div>
</template>

<script>
  import Siema from '../src/index'
  export default {
    name: 'app',
    components: {
      Siema
    },
    data () {
      return {
        buttons: {
          prev: false,
          next: false
        },
        loop: false,
        currentSlide: 0,
        sliderIndex: 2,
        slides: [
          '<img src="https://unsplash.it/600/350?image=10" alt="slide">',
          '<img src="https://unsplash.it/600/350?image=12" alt="slide">',
          '<img src="https://unsplash.it/600/350?image=13" alt="slide">',
          '<img src="https://unsplash.it/600/350?image=14" alt="slide">',
          '<img src="https://unsplash.it/600/350?image=15" alt="slide">',
          '<img src="https://unsplash.it/600/350?image=16" alt="slide">'
        ]
      }
    },
    methods: {
      goTo () {
        this.$refs.slider.goTo(this.sliderIndex)
      },
      // Events
      slideChanged (currentSlide) {
        this.currentSlide = currentSlide

        /**
         * This shows how to enable or disable button
         */
        if (!this.loop) {
          this.buttons.prev = currentSlide === 0
          this.buttons.next = currentSlide === this.slides.length - 1
        }
      },
      // Controls
      prev () {
        this.$refs.slider.prev()
      },
      next () {
        this.$refs.slider.next()
      },
      addSlide () {
        const number = Math.floor((Math.random() * 80) + 1)
        this.slides.push(`<img src="https://unsplash.it/600/350?image=${number}" alt="slide">`)
      }
    }
  }
</script>

<style>
    html {
        font-size: 16px;
    }

    body {
        width: 100%;
        max-width: 37.5rem;
        margin: 0 auto;
    }

    img {
        max-width: 100%;
        display: block;
    }
</style>