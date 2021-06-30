import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Welcome from "../views/Welcome";
import Index from "../components/Index";
import Type from "../components/Type";
import Tag from "../components/Tag";
import Archives from "../components/Archives";
import About from "../components/About";

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
            {path: '/type', component: Type},
            {path: '/tag', component: Tag},
            {path: '/archives', component: Archives},
            {path: '/about', component: About},
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
