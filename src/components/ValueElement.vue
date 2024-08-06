<template>
    <table class="table-auto border-collapse border border-gray-300 m-1">
        <thead>
            <tr>
                <th class="border border-gray-300 p-2">{{ typevals }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(hexNormalizedSize, index) in editableValues" :key="index">
                <td class="border border-gray-300 p-2">
                    <input v-model="editableValues[index]" type="text"
                        class="w-full p-1 border border-gray-300 rounded" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ref, computed } from 'vue';
import { getFormatFromValue, TypeSoported } from '../scripts/mastercoverter';

export default {
    name: 'ValueElement',
    emits: ["selectCharacter"],
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
        typevalues: String
    },
    methods: {
    },
    setup(props) {
        console.log(props)
        const typevals = ref(props.typevalues)
        const editableValues = computed({
            get() {
                return [...props.value].map((x) => getFormatFromValue(x, TypeSoported.HEXADECIMAL));
            },
            set(value) {
                // const number = parseInt(value, 16);
                // if (!isNaN(number)) {
                //     normalizedSize.value = number;
                // }
            }
        });
        return {
            typevals,
            editableValues
        };
    }
}
</script>

<style></style>
