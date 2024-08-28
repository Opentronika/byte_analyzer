<template>
  <table class="table-auto border-collapse border border-gray-300 m-1 rounded">
    <thead class="border-gray-300 p-2 bg-slate-200 dark:border-gray-700 dark:bg-slate-600 dark:text-white">
      <tr>
        <th colspan="2">{{ name }}</th>
      </tr>
      <tr>
        <th class="border">Value</th>
        <th class="border">Raw Bytes</th>
      </tr>
    </thead>
    <tbody>
      <tr class="w-full p-2 border border-gray-300 rounded dark:border-gray-700  dark:text-white" v-for="(hexNormalizedSize, index) in editableValues" :key="index">
        <td class="border">
          <input v-model="editableValues[index].m_StringValue" @input="handleInputChange($event, index)" type="text" class=" px-1 dark:bg-slate-900" />
        </td>
        <td >
          <input v-model="editableValues[index].m_StringRaw" @input="handleInputRawChange($event, index)" type="text" class=" px-1 dark:bg-slate-900" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed} from 'vue';

export default {
  name: 'ValueElement',
  data() {
    return {
    }
  },
  props: {
    value: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.every(item => typeof item === 'number');
      }
    },
    typeClass: {
      type: Function,  
      required: true
    }
  },
  methods: {
  },
  setup(props, {emit}) {
    const typevals = ref(props.typevalues)
    const name= ref(props.typeClass.cNAME)
    
    const editableValues = computed({
      get() {
        return [...props.value].map((x) => new props.typeClass(x));
      },
      set(value) {
        emit('update:value', value.map((x) => x.toInt()));
      }
    });

    function handleInputChange(event, index) {
      event.target.value = props.typeClass.filter(event.target.value)
      const newValue = new props.typeClass(event.target.value);
      const newValues = [...editableValues.value];
      newValues[index]=newValue
      // Actualiza el valor computado
      editableValues.value = newValues;
    }

    function handleInputRawChange(event, index) {
      event.target.value = props.typeClass.filterRaw(event.target.value)
      console.log(event.target.value)
      const newValue = new props.typeClass(event.target.value,true);
      const newValues = [...editableValues.value];
      newValues[index]=newValue
      // Actualiza el valor computado
      editableValues.value = newValues;
    }


    return {
      typevals,
      editableValues,
      handleInputChange,
      handleInputRawChange,
      name
    };
  }
}
</script>

<style></style>
