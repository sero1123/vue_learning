<template>
<div v-if="posts.length > 0">
    <transition-group name="post-list">
        <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
        />
    </transition-group>
</div>
<h2 v-else style="color: red;">Посты не найдены</h2>
</template>

<script>
import PostItem from '@/components/postItem.vue'
export default {

    components: {
        PostItem
    },
    props: {
        posts: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move{
    transition: transform 0.4s ease;
}

</style>