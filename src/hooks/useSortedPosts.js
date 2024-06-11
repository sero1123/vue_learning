import { computed, ref } from 'vue';

export default function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts.value].sort((post1, post2) =>{
            try {
                return post1[selectedSort.value].toString()?.localeCompare(post2[selectedSort.value].toString());
            }catch(e) {
                console.log(e);
            }
        })
    })

    return {selectedSort, sortedPosts}
}