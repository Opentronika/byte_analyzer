<template>
  <div class="w-full max-w-[1500px] p-2 mx-auto">
    <ValueElement :value="mainvals" :typeClass="BinaryType" @update:value="handleUpdate" @add-mainval="addMainVal" />
  </div>

  <div id="app" class=" flex dark:bg-gray-900 bg-white p-2 justify-center flex-wrap [&>*]:max-w-[500px]">
    <ValueElement :value="mainvals" :typeClass="HexadecimalType" @update:value="handleUpdate"
      @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Uint32BE" @update:value="handleUpdate" @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Int64BE" @update:value="handleUpdate" @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Int32BE" @update:value="handleUpdate" @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Int16BE" @update:value="handleUpdate" @add-mainval="addMainVal" />
    <ValueElement :value="mainvals" :typeClass="Int8BE" @update:value="handleUpdate" @add-mainval="addMainVal" />
  </div>
</template>

<script>
import { ref } from 'vue';
import HexadecimalType from '../classes_types/HexadecimalType';
import BinaryType from '../classes_types/BinaryType'
import {Int64BE,Int32BE,Int16BE,Int8BE,Uint32BE} from '../classes_types/32BEType';
import ValueElement from './ValueElement.vue';
export default {
  name: 'MainApp',
  components: {
    ValueElement
  },
  data() {
    return { HexadecimalType, Uint32BE, BinaryType,Int64BE,Int32BE,Int16BE,Int8BE };
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
