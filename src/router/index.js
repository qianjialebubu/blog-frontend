import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Welcome from "../views/Welcome";
import Index from "../components/Index";
import About from "../components/About";
import Blog from "../components/Blog";
import Project from "../components/Project";
import Message from "../components/Message";
import Essay from "../components/Essay";
import Home from "../views/Home";
import Blogs from "../components/admin/Blogs";
import Blog_input from "../components/admin/Blog_input";
import Tags from "../components/admin/Tags";
import Types from "../components/admin/Types";
import Users from "../components/admin/Users";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Welcome,
        redirect: '/index',
        children: [
            {path: '/index', component: Index},
            {path: '/about', component: About},
            {path: '/blogInfo', component: Blog},
            {path: '/project', component: Project},
            {path: '/message', component: Message},
            {path: '/essay', component: Essay}
        ]
    },
    {
        path: '/admin',
        component: Home,
        redirect: '/blogs',
        children: [
            {path: '/blogs', component: Blogs},
            {path: '/blog-input', component: Blog_input},
            {path: '/users', component: Users},
            {path: '/types', component: Types},
            {path: '/tags', component: Tags},
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    // next() 放行  next('login') 强制跳转
    if (to.path === '/admin/login') return next();
    if (to.path === '/admin/blogs') {
        const tokenStr = window.sessionStorage.getItem('token')
        if (!tokenStr) return next('/admin/login')
    }
    next()
})

export default router
