import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Student from '../components/Student'
import Teacher from '../components/Teacher'
import Manager from '../components/Manager'
import Home from '../components/Home'
import show from '../components/show'
import labshow from '../components/showComponents/labshow'
import labstate from '../components/showComponents/labstate'
import queshow from '../components/showComponents/queshow'
import quenumber from '../components/showComponents/quenumber'
import questate from '../components/showComponents/questate'
import queservice from '../components/showComponents/queservice'
import teachcourse from '../components/showComponents/teachcourse'
import teachproject from '../components/showComponents/teachproject'
import teachbook from '../components/showComponents/teachbook'
import teachrule from '../components/showComponents/teachrule'
import teachers from '../components/showComponents/teachers'
import pmessage from '../components/showComponents/pmessage'
import pscore from '../components/showComponents/pscore'
import pproject from '../components/showComponents/pproject'
import preport from '../components/showComponents/preport'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Student',
      name: 'Student',
      component: Student,
      children:[
        {
          path: '/Home',
          name: 'Home',
          component: Home
        },
        {
          path:'/labshow',
          name:'labshow',
          component:labshow
        },
        {
          path:'/labstate',
          name:'labstate',
          component:labstate
        },
        {
          path:'/queshow',
          name:'queshow',
          component:queshow
        },
        {
          path:'/quenumber',
          name:'quenumber',
          component:quenumber
        },
        {
          path:'/questate',
          name:'questate',
          component:questate
        },
        {
          path:'/queservice',
          name:'queservice',
          component:queservice
        },
        {
          path:'/teachcourse',
          name:'teachcourse',
          component:teachcourse
        },
        {
          path:'/teachproject',
          name:'teachproject',
          component:teachproject
        },
        {
          path:'/teachbook',
          name:'teachbook',
          component:teachbook
        },
        {
          path:'/teachrule',
          name:'teachrule',
          component:teachrule
        },
        {
          path:'/teachers',
          name:'teachers',
          component:teachers
        },
        {
          path:'/pmessage',
          name:'pmessage',
          component:pmessage
        },
        {
          path:'/pscore',
          name:'pscore',
          component:pscore
        },
        {
          path:'/pproject',
          name:'pproject',
          component:pproject
        },
        {
          path:'/preport',
          name:'preport',
          component:preport
        }
      ]
    },
    {
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/Manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/show',
      name: 'show',
      component: show
    }
  ]
})
