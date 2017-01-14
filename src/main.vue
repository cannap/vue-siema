<template>
  <div id="app" class="siema" ref="wrap">

    <slot></slot>


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
        default: false
      }

    },


    methods: {

    },





  }
</script>