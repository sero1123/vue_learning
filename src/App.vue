<template>
    <my-navigation></my-navigation>
    <div  class='app'>
        <router-view></router-view>
    </div>
</template>

<script>
import MyNavigation from '@/components/navigation.vue'
export default {
    components:{
    MyNavigation
}
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 15px;
}

</style>