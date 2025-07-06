<template>
  <table class="table-auto border-collapse border border-gray-300 m-1 rounded w-full ">
    <thead class="border-gray-300 p-2 bg-slate-200 dark:border-gray-700 dark:bg-slate-600 dark:text-white">
      <tr>
        <th class="px-2">{{ name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="p-2 border border-gray-300 rounded dark:border-gray-700  dark:text-white"
        v-for="(hexNormalizedSize, index) in editableValues" :key="index">
        <td class="border">
          <input v-model="editableValues[index].m_StringValue" @input="handleInputChange($event, index)" type="text"
            class=" px-1 dark:bg-slate-900 w-full" />
        </td>
      </tr>
      <tr>
        <td class="border">
          <button @click="$emit('add-mainval', { byteLen: typeClass.cMaxLengthBytes })"
            class=" dark:text-white px-2 py-1 rounded w-full">Add Row</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed } from 'vue';

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
        return value.every(item =>
          typeof item.value === 'bigint' && // Verifica que `value` sea un BigInt
          typeof item.byteLength === 'number' && // Verifica que `byteLength` sea un número
          item.byteLength > 0 // Asegura que `byteLength` sea mayor que 0
        );
      }
    },
    typeClass: {
      type: Function,
      required: true
    }
  },
  methods: {
  },
  setup(props, { emit }) {
    const typevals = ref(props.typevalues)
    const name = ref(props.typeClass.cNAME)

    const editableValues = computed({
      get() {
        return [...props.value].map((x) => new props.typeClass(x.value, x.byteLength));
      },
      set(value) {
        // emit('update:value', value.map((x) => x.toInt()));
      }
    });

    function handleInputChange(event, index) {
      event.target.value = props.typeClass.filter(event.target.value)
      const newValue = props.typeClass.fromString(event.target.value);
      emit('update:value', {
        updatedIndex: index,
        updatedValue: newValue
      });
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
