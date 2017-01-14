
##WIP !!

vue-siema - Lightweight and simple carousel for Vue <br>
This project is based on https://github.com/pawelgrzybek/siema

⚠️️**Warning:** vue-siema uses internal v-html be sure to sanitize **only use on trusted content!


##Install 
```npm install --save vue-siema```

##Props 
| Prop       | Type    | Default    | Required |
|------------|---------|------------|----------|
| duration   | Number  | 200        | false    |
| slides     | Array   | empty      | true     |
| easing     | String  | 'ease-out' | false    |
| perPage    | Number  | 1          | false    |
| startIndex | Number  | 0          | false    |
| draggable  | Boolean | true       | false    |
| threshold  | Number  | 20         | false    |
| loop       | Boolean | true       | false    |




##Usage 
```html
<template>
    <div class="slider">
        <Siema :slides="slides">
        </Siema>
    </div>
</template>
```
```js
   <script>
   import Siema from 'vue-siema'
   export default {
     name: 'hello',
     data() {
       return {
         sliderIndex: 2,
         slides: [ //⚠️️ Warning: vue-siema uses internal v-html be sure to sanitize!
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
```
