<template>
    <div class="navigation">
        <div @click="$router.push('/')" >Vue 3</div>

        <div class="navigation__btn">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 20px;">О приложении</my-button>
            <my-button @click="$router.push('/store')" style="margin-left: 20px;">store</my-button>
            <my-button @click="$router.push('/composition')" style="margin-left: 20px;">Composition Api</my-button>

        </div>
    </div>
</template>

<script>
export default {
    name: 'navigation',
}
</script>

<style scoped>
.navigation {
    height: 50;
    box-shadow: 2 2 4px gray;
    background-color: lightgray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navigation__btn {
    margin-left: auto;
}
</style>