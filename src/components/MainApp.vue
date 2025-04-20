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
    const mainvals = ref([{ value: 60n, byteLength: 4 },
    { value: 10n, byteLength: 4 },
    { value: 5n, byteLength: 1 }]);

    const handleUpdate = (newValue) => {
      console.log("handleUpdate", newValue);
      mainvals.value[newValue.updatedIndex] = { value: newValue.updatedValue.toInt(), byteLength: newValue.updatedValue.constructor.cMaxLengthBytes };
      console.log("mainvals", mainvals.value);
    };
    return { mainvals,handleUpdate }
  }
}
</script>
