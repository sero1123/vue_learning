<template   >
    <input :value="modelValue" @input="updateValue" type="text" class ="input">
</template>

<script>
export default {
    name : 'my-input',
    props: {
        modelValue: {String, Number}
    }, methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 2px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>