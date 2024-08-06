<template>
  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center">
    <ValueElement :value="mainval" :typeClass="HexadecimalType" />
    <ValueElement :value="mainval" :typeClass="HexadecimalType" />
    <ValueElement :value="mainval" :typeClass="HexadecimalType" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import HexadecimalType from '../classes_types/HexadecimalType';
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  components: {
    ValueElement
  },
  data() {
    return { HexadecimalType };
  },
  setup(props) {
    const mainval = ref([60, 10, 5])
    return { mainval }
  }
}
</script>

<style></style>import type HelloWorldVue from './HelloWorld.vue';
