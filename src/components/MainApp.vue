<template>
  <div id="app" class="dark:bg-gray-900 bg-white">
    <ValueElement :value="mainval"/>
  </div>
</template>

<script>
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  data() {
    return {
      mainval:60
    }
  },
  components: {
    ValueElement
  },
  methods: {

  },
  mounted() {
  },
}
</script>

<style>

</style>import type HelloWorldVue from './HelloWorld.vue';

