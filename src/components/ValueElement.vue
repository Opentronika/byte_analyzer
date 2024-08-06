<template>
  <div>
    <input v-model=hexNormalizedSize type="text" class=" w-60 border-e-gray-300 border rounded-md p-2">
  </div>
</template>

<script>
import { ref,computed } from 'vue';

export default {
    name: 'ValueElement',
    emits: ["selectCharacter"],
    data(){
        return{
        }
    },
    props: {
        value: Number
    },
    methods: {
    },
    setup(props){
        const normalizedSize = ref(props.value)
        const hexNormalizedSize = computed({
      get() {
        return `0x${normalizedSize.value.toString(16).padStart(2, '0').toUpperCase()}`;
      },
      set(value) {
        const number = parseInt(value, 16);
        if (!isNaN(number)) {
          normalizedSize.value = number;
        }
      }
    });
        return{
            normalizedSize,
            hexNormalizedSize
        };
    }   
}
</script>

<style>
</style>
