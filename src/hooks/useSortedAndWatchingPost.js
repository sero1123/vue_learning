import { computed, ref } from 'vue';

export default function useSortedAndSearchPosts(sortedPosts) {
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    console.log(sortedAndSearchedPosts)
    return {searchQuery, sortedAndSearchedPosts}
}