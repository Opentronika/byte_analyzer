<template>
  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center">
    <ValueElement :value="mainvals" :typeClass="HexadecimalType" @update:value="handleUpdate"/>
    <ValueElement :value="mainvals" :typeClass="Uint32BIType" @update:value="handleUpdate"/>
    <ValueElement :value="mainvals" :typeClass="Int32BIType" @update:value="handleUpdate"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import HexadecimalType from '../classes_types/HexadecimalType';
import Uint32BIType from '../classes_types/Uint32BIType';
import BinaryType from '../classes_types/BinaryType'
import Int32BIType from '../classes_types/Int32BIType';
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  components: {
    ValueElement
  },
  data() {
    // return { HexadecimalType, Uint32BIType, Int32BIType, BinaryType};
    return { HexadecimalType, Uint32BIType, Int32BIType, BinaryType};
  },
  setup(props) {
    const mainvals = ref([60n, 10n, 5n]);

    const handleUpdate = (newValue) => {
      mainvals.value = newValue;
    };
    return { mainvals,handleUpdate }
  }
}
</script>
