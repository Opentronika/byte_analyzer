<template>
  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center">
    <ValueElement :value="[60, 10, 5]" typevalues="hexadecimal"/>
    <ValueElement :value="[60, 10, 5]" typevalues="hexadecimal"/>
    <ValueElement :value="[60, 10, 5]" typevalues="hexadecimal"/>
  </div>
</template>

<script>
import { ref,computed } from 'vue';
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  components: {
    ValueElement
  },
  setup(props){
    const mainval = ref([60,10,5])
    return mainval
  }
}
</script>

<style>

</style>import type HelloWorldVue from './HelloWorld.vue';

