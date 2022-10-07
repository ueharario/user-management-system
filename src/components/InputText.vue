<template>
    <input
        class="form-control"
        type="text"
        v-model="modelValue"
        :placeholder="placeholder"
    />
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
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