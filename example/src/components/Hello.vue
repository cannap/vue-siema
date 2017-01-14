<template>
    <div class="hello">
        <Siema>
            <SiemaSlide v-for="slide in slides" v-html="slide"></SiemaSlide>
        </Siema>
    </div>
</template>

<script>
  import  Siema from '../../../src/'
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
      SiemaSlide
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
