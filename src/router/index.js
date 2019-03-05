import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/users/Login'
import Register from '@/views/users/Register'
import test from '@/components/UploadAvatar'
import t from '@/components/TestCropper'
import c from '@/components/ContentList'
import home from '@/views/Home'
import input from '@/components/InputText'
import postcontent from '@/views/posts/PostContent'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            alias: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/t',
            name: 't',
            component: t
        },
        {
            path: '/c',
            name: 'c',
            component: c
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/input',
            name: 'input',
            component: input
        },
        {
            path: '/postcontent',
            name: 'postcontent',
            component: postcontent
        }
    ]
})