<template>
  <div class="w-full max-w-[1500px] p-2 mx-auto">
    <ValueElement :value="mainvals" :typeClass="BinaryType" @update:value="handleUpdate" @add-mainval="addMainVal" />
  </div>

  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center flex-wrap [&>*]:max-w-[500px]">
    <ValueElement :value="mainvals" :typeClass="HexadecimalType" @update:value="handleUpdate"
      @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Uint32BIType" @update:value="handleUpdate" @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Int32BIType" @update:value="handleUpdate" @add-mainval="addMainVal" />
  </div>
</template>

<script>
import { ref } from 'vue';
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
    return { HexadecimalType, Uint32BIType, Int32BIType, BinaryType };
  },
  setup(props) {
    const mainvals = ref([{ value: 0n, byteLength: 4 },
    { value: 0n, byteLength: 8 },
    { value: 0n, byteLength: 16 }]);

    const handleUpdate = (newValue) => {
      console.log("handleUpdate", newValue);
      mainvals.value[newValue.updatedIndex] = { value: newValue.updatedValue.toInt(), byteLength: newValue.updatedValue.constructor.cMaxLengthBytes };
      console.log("mainvals", mainvals.value);
    };

    const addMainVal = (bytelen) => {
      mainvals.value.push({ value: 0n, byteLength: bytelen.byteLen });
    };
    return { mainvals, handleUpdate, addMainVal }
  }
}
</script>
