<template>
  <div id="app" class="siema" ref="wrap">

    <div class="inner-siema" :style="styleObject">
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
        default: false
      }

    },

    data() {
      return {
        styleObject: {}
      }
    },

    mounted() {
      const docFragment = document.createDocumentFragment();
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].$el.style.float = 'left'
        this.$children[i].$el.style.cssFloat = 'left'
        this.$children[i].$el.style.width = `${100 / this.$children.length}%`;

      }

      const siemaWidth = this.$refs.wrap.getBoundingClientRect().width
      this.styleObject = Object.assign({}, this.styleObject, {
        width: `${(siemaWidth / this.perPage) * this.$children.length}px`, //The Container width 
        transition: `all ${this.duration}ms ${this.easing}`,
      })


    },

    methods: {

    },

  }
</script>

<style>

.siema {
  overflow:hidden;
  cursor:-webkit-grab;
}
.siema-slide {
  float:left;
}
</style>