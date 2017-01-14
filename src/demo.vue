<template>
    <div id="app" class="component">
        <Siema ref="slider" :slides="slides">

        </Siema>

    </div>
</template>

<script>
    import Siema from './siema.vue'
    export default {
        name: 'app',
        components: {
            Siema,
        },
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
        methods: {

            goTo() {
                this.$refs.slider.goTo(this.sliderIndex)
            }
        }
    }
</script>