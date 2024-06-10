<template>
    <div class='app'>
        <h1>Список постов</h1>
        <my-input 
            v-model="searchQuery"
        />

        <div class="app__btns">
            <my-dialog v-model:show="dialogVisible">    
            <post-form
            @create = "createPost"
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
        <div class="observer" ref="observer"></div>
    </div>
</template>
<script>
import PostForm from '@/components/postForm.vue'
import PostList from '@/components/postList.vue'
import axios from 'axios';
import { watch } from 'vue';
export default {

    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts : [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
                {value: 'id', name: 'По id'}
            ]
        }
    }, methods: {
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
        async fetchPost() {
            try {
                this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {params: { _page: this.page, _limit: this.limit }});
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    this.posts = response.data;
            } catch(e) {
                alert(e);
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePost() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {params: { _page: this.page, _limit: this.limit }});
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch(e) {
                alert(e);
            } 
        },
    },
    mounted() {
        this.fetchPost();
        this.$refs.observer
        let options = {
        rootMargin: "0px",
        threshold: 1.0,
        };
        let callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                this.loadMorePost();
            }
        } 


        let observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>{
                try {
                    return post1[this.selectedSort].toString()?.localeCompare(post2[this.selectedSort].toString());
                }catch(e) {
                    console.log(e);
                }
            })
        },
        sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }     
    },
    watch: {
        // page() {
        //     this.fetchPost();
        // }
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
