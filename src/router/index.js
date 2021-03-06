import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import NewTask from "../views/NewTask.vue"
import Task from "../views/Task.vue"
import GPT from "../views/GPT.vue"
import Chat from "../views/Chat.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/task/newtask',
    name: 'NewTask',
    component: NewTask,
    show: false
  },
  {
    path: '/task:taskId',
    name: 'Task',
    component: Task,
    show: false
  },
  {
    path: '/gpt',
    name: 'GPT',
    component: GPT,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  // {
  //   path: '/task',
  //   name: 'Task',
  //   component: Home
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
