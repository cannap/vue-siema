<template>
    <div class="slider">
        <Siema :slides="slides">
        </Siema>
    </div>
</template>

<script>
  import Siema from 'vue-siema'

  export default {
    name: 'hello',

    data() {
      return {
        sliderIndex: 2,
        slides: [
          '<img src="https://unsplash.it/600/350?image=10" alt= "slide" />',
          '<img src="https://unsplash.it/600/350?image=12" alt= "slide" />',
          '<img src="https://unsplash.it/600/350?image=13" alt= "slide" />',
          '<img src="https://unsplash.it/600/350?image=14" alt= "slide" />',
          '<img src="https://unsplash.it/600/350?image=15" alt= "slide" />',
          '<img src="https://unsplash.it/600/350?image=16" alt= "slide" />',
        ]
      }
    },
    components: {
      Siema,
    }
  }
</script>

<style>
    body {

        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
</style>
