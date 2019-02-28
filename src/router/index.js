import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import Student from '../components/Student'
import Teacher from '../components/Teacher'
import Manager from '../components/Manager'
import show from '../components/show'
import showlab from '../components/showComponents/showlab'
import showteacher from '../components/showComponents/showteacher'
import showque from '../components/showComponents/showque'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Student',
      name: 'Student',
      component: Student
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
      component: show,
      children:[
        {
          path:'/',
          name:'show-lab',
          component:showlab
        },
        {
          path:'show-teacher',
          name:'show-teacher',
          component:showteacher
        },
        {
          path:'showque',
          name:'showque',
          component:showque
        }
      ]
    }
  ]
})
