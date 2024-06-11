import Main from '@/pages/Main' 
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About.vue'
import Post from '@/pages/Post.vue'
import PostPageWithVueX from '@/pages/PostPageWithVueX.vue'
import PostPageWithCompositionAPI from '@/pages/PostPageWithCompositionApi.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/posts',
        name: 'PostPage',
        component: PostPage
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/posts/:id',
        component: Post
    },
    {
        path: '/store',
        component: PostPageWithVueX
    },
    {
        path: '/composition',
        component: PostPageWithCompositionAPI
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router