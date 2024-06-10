<template>
    <div>
        <div class='post'>
            <strong>Название:</strong> {{ post.title }} <br>
            <strong>Описание:</strong> {{ post.body }}
            <strong>id:</strong> {{ post.id }}

            <div class="post_btns">
                <my-button
                    @click="$emit('remove', post)">Удалить</my-button>
                <my-button @click="$router.push('/posts/' + post.id)">Перейти</my-button>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        post: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post_btns {
    display: flex;
}
</style>