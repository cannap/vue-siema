<template>
    <div id="app" class="component">
        <Siema>
            <SiemaSlide v-for="slide in slides" v-html="slide"></SiemaSlide>
        </Siema>
    </div>
</template>

<script>
    import Siema from './main.vue'
    import SiemaSlide from './siema-slide'
    export default {
        name: 'app',
        components: {
            Siema,
            SiemaSlide
        },
        data() {
            return {
                slides: [
                    '<img src="https://unsplash.it/600/350?image=10" alt= "slide" />',
                    '<img src="https://unsplash.it/600/350?image=12" alt= "slide" />',
                    '<img src="https://unsplash.it/600/350?image=13" alt= "slide" />',
                    '<img src="https://unsplash.it/600/350?image=14" alt= "slide" />',
                    '<img src="https://unsplash.it/600/350?image=15" alt= "slide" />',
                    '<img src="https://unsplash.it/600/350?image=16" alt= "slide" />',
                ]
            }
        }
    }
</script>