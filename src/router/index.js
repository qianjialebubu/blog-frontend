import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/login/Login";
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
import AdminIndex from "../components/admin/AdminIndex";
import Comments from "../components/admin/Comments";
import Essays from "../components/admin/Essays";
import Projects from "../components/admin/Projects";

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
        // 挂载路由导航守卫
        beforeEnter: (to, from, next) => {
            // to 将要访问的路径
            // from 代表从哪个路径跳转而来
            // next 是一个函数，表示放行
            // next() 放行  next('login') 强制跳转
            const tokenStr = window.sessionStorage.getItem('token')
            console.log(tokenStr)
            if (!tokenStr) return next('/login')
            next()
        },
        redirect: '/admin/index',
        children: [
            {path: '/admin/index', component: AdminIndex},
            {path: '/admin/blogs', component: Blogs},
            {path: '/admin/blog-input', component: Blog_input},
            {path: '/admin/users', component: Users},
            {path: '/admin/types', component: Types},
            {path: '/admin/tags', component: Tags},
            {path: '/admin/comments', component: Comments},
            {path: '/admin/essays', component: Essays},
            {path: '/admin/projects', component: Projects},
        ]
    }
]

const router = new VueRouter({
    routes
})


export default router
