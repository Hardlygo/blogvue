/**
 * 项目接口管理
 */
const serviceModule = {
    user: {
        register: {
            url: '/user/register',
            type: 'post',
            method: 'formPost'
        },
        login: {
            url: '/user/login',
            type: 'post',
            method: 'formPost'
        },
        userinfo: {
            url: '/user/userinfo',
            type: 'post',
            method: 'formPost'
        },
        logout: {
            url: '/user/logout',
            type: 'post',
            method: 'formPost'
        }
    },
    post: {
        newpost: {
            url: '/post/newpost',
            type: 'post',
            method: 'formPost'
        },
        delete: {
            url: '/post/delete',
            type: 'post',
            method: 'formPost'
        },
        getpost: {
            url: '/post/getpost',
            type: 'get',
            method: 'get'
        },
        getposts: {
            url: '/post/getposts',
            type: 'get',
            method: 'get'
        }
    },
    comment: {
        getcomments: {
            url: '/comment/getcomments',
            type: 'post',
            method: 'formPost'
        },
        addcomment: {
            url: '/comment/addcomment',
            type: 'post',
            method: 'formPost'
        },
        removecomment: {
            url: '/comment/removecomment',
            type: 'post',
            method: 'formPost'
        },
        removeall: {
            url: '/comment/removeall',
            type: 'post',
            method: 'formPost'
        },
        commentcounts: {
            url: '/comment/commentcounts',
            type: 'get',
            method: 'get'
        }
    }
}
export const {...Api } = serviceModule;