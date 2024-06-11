<template>
    <div>
        <h1>Список постов</h1>
        <my-input 
            v-model="searchQuery"
            placeholder="Поиск"
            v-focus
        />

        <div class="app__btns">
            <my-dialog v-model:show="dialogVisible">    
            <post-form
            />
            </my-dialog>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-button @click="showDialog">Создать пост</my-button>
        <my-button @click="fetchPost">Получить пост</my-button>
        <post-list
         :posts = "sortedAndSearchedPosts"
         v-if="!isPostsLoading"
         />

        <div v-else>Идет загрузка...</div>
    </div>
</template>
<script>
import PostForm from '@/components/postForm.vue'
import PostList from '@/components/postList.vue'
import usePosts from '@/hooks/usePosts';
import useSortedAndSearchPosts from '@/hooks/useSortedAndWatchingPost';
import useSortedPosts from '@/hooks/useSortedPosts';
import axios from 'axios';
import { watch, ref } from 'vue';
export default {

    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
                {value: 'id', name: 'По id'}
            ]
        }
    }, methods: {
        
    },
    mounted() {
       
    },
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchPosts(sortedPosts);
        console.log(searchQuery);
        console.log(sortedAndSearchedPosts);
        console.log(sortedPosts);

        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        }
    }

}

</script>

<style>

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

.observer {
    height: 30px;
    background: green;
}

</style>
