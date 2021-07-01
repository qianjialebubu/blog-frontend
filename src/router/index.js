import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/admin/Login";
import Welcome from "../views/Welcome";
import Index from "../components/Index";
import Archives from "../components/Archives";
import About from "../components/About";
import Blog from "../components/Blog";
import Project from "../components/Project";
import Message from "../components/Message";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Welcome,
        redirect:'/index',
        children: [
            {path: '/index', component: Index},
            {path: '/archives', component: Archives},
            {path: '/about', component: About},
            {path: '/blogInfo', component: Blog},
            {path: '/project',component: Project},
            {path: '/message',component: Message}
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
