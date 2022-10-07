<template>
    <select class="form-control" v-model="modelValue">
        <option disabled value="">Please select.</option>
        <option v-for="key in options" :key="key.id" :value="key.id">
            {{ key.label }}
        </option>
    </select>
</template>

<script>
import { GENDER_ARRAY } from '@/constants/USERS.js'

export default {
    props: {
        value: {
            type: Number,
            default: 0
        },
        options: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            GENDER_ARRAY
        }
    },
    computed: {
        val: {
            get() {
                return this.value
            },
            set(val) {
                this.updateValue({ val })
            }
        }
    },
    methods: {
        updateValue(diff) {
            this.$emit('input', { ...this.value, ...diff })
        }
    }
}
</script>