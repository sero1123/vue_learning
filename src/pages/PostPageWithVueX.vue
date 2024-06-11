<template>
    <div>
        <h1>Список постов</h1>
        <my-input 
            :model-value="searchQuery"
            @update:model-value="setSearch"
            placeholder="Поиск"
            v-focus
       />

        <div class="app__btns">
            <my-dialog v-model:show="dialogVisible">    
            <post-form
            @create = "createPost"
            />
            </my-dialog>
            <my-select 
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-button @click="showDialog">Создать пост</my-button>
        <my-button @click="fetchPost">Получить пост</my-button>
        <post-list
         :posts = "sortedAndSearchedPosts"
         @remove = "removePost"
         v-if="!isPostsLoading"
         />

        <div v-else>Идет загрузка...</div>
        <!-- <div class="page__wrapper" >
            <div v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            class="page"
            :class="{ 'current-page' : page === pageNumber }"
            @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->
        <div class="observer" v-intersection="loadMorePost"></div>
    </div>
</template>
<script>
import PostForm from '@/components/postForm.vue'
import PostList from '@/components/postList.vue'
import axios from 'axios';
import { watch } from 'vue';
import { useStore, mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {

    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false,
        }
    }, methods: {
        ...mapMutations({
            setPage: 'post/setPage'   ,
            setSearch: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),

        ...mapActions   ({
            loadMorePost: 'post/loadMorePost',
            fetchPost: 'post/fetchPost'
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)

        }, 
        showDialog() { 
            this.dialogVisible = true
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // },
        
    },
    mounted() {
        this.fetchPost();
        // this.$refs.observer
        // let options = {
        // rootMargin: "0px",
        // threshold: 1.0,
        // };
        // let callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePost();
        //     }
        // } 


        // let observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts, 
            page: state => state.post.page, 
            limit: state => state.post.limit, 
            totalPages: state => state.post.totalPages, 
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            sortOptions: state => state.post.sortOptions,

        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
   
    },
    watch: {
        // page() {
        //     this.fetchPost();
        // }
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
