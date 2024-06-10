<template>
    <div v-if = "show === true" class="dialog" @click="hideDialog">
        <div class="dialog_content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import togleMixin from '@/mixins/togleMixin';

export default {
    name : 'my-dialog',   
    mixins: [togleMixin],
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog_content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>