<template>
  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center">
    <ValueElement :value="mainvals" :typeClass="HexadecimalType" @update:value="handleUpdate"/>
    <ValueElement :value="mainvals" :typeClass="DecimalType" @update:value="handleUpdate"/>
    <ValueElement :value="mainvals" :typeClass="BinaryType" @update:value="handleUpdate"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import HexadecimalType from '../classes_types/HexadecimalType';
import DecimalType from '../classes_types/DecimalType';
import BinaryType from '../classes_types/BinaryType'
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  components: {
    ValueElement
  },
  data() {
    return { HexadecimalType, DecimalType, BinaryType};
  },
  setup(props) {
    const mainvals = ref([60, 10, 5])

    const handleUpdate = (newValue) => {
      console.log(newValue)
      mainvals.value = newValue;
    };
    return { mainvals,handleUpdate }
  }
}
</script>
