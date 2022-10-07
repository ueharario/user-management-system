<template>
    <input
        class="form-control"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="updateValue"
    />
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>