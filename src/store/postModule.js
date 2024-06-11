import axios from 'axios';

export const postModule = {
    state: () => ({
        posts : [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>{
                try {
                    return post1[state.selectedSort].toString()?.localeCompare(post2[state.selectedSort].toString());
                }catch(e) {
                    console.log(e);
                }
            })
        },
        sortedAndSearchedPosts(state, getters) {
                return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
            }  
    },
    mutations: {
        setPost(state, posts) {
            state.posts = posts
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setSortedOptions(state, options) {
            state.sortOptions = options
        }
    },
    actions: {
        async fetchPost({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {params: { _page: state.page, _limit: state.limit }});
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)); 
                commit('setPost', response.data);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePost({state, commit}) {
            try {
                state.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {params: { _page: state.page, _limit: state.limit }});
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)); 
                commit('setPost', [...state.posts, ...response.data]);
            } catch(e) {
                console.log(e);
            } 
        },
    },
    namespaced: true
} 
