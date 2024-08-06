<template>
  <table class="table-auto border-collapse border border-gray-300 m-1">
    <thead>
      <tr>
        <th class="border border-gray-300 p-2">{{ name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(hexNormalizedSize, index) in editableValues" :key="index">
        <td class="border border-gray-300 p-2">
          <input v-model="editableValues[index].m_StringValue" @input="handleInputChange($event, index)" type="text" class="w-full p-1 border border-gray-300 rounded" />
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


    return {
      typevals,
      editableValues,
      handleInputChange,
      name
    };
  }
}
</script>

<style></style>
