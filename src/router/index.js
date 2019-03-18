import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Student from '../components/Student'
import Teacher from '../components/Teacher'
import Manager from '../components/Manager'
import Home from '../components/Home'
import show from '../components/show'
import showmsg from '../components/showmsg'
import foot from '../components/foot'
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
import readreport from '../components/showComponents/read-report'
import deallabshow from '../components/showComponents/deal-labshow'
import dealqueshow from '../components/showComponents/deal-queshow'
import dealquenumber from '../components/showComponents/deal-quenumber'
import deallabstate from '../components/showComponents/deal-labstate'
import dealquestate from '../components/showComponents/deal-questate'
import dealqueservice from '../components/showComponents/deal-queservice'
import dealcourse from '../components/showComponents/deal-course'
import dealproject from '../components/showComponents/deal-project'
import dealteacher from '../components/showComponents/deal-teacher'
import addproject from '../components/showComponents/add-project'
import addscore from '../components/showComponents/add-score'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/showmsg',
      name: 'showmsg',
      component: showmsg
    },
    {
      path: '/foot',
      name: 'foot',
      component:foot
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      children:[
        {
          path: '/Home',
          name: 'Home',
          component: Home
        }]
    },
    {
      path: '/show',
      name: 'show',
      component: show,
      children:[
        {
          path: '/Login',
          name: 'Login',
          component: Login
        }]
    },
    {
      path: '/Student',
      name: 'Student',
      component: Student,
      children:[
        {
          path: '/StudentHome',
          name: 'StudentHome',
          component: Home
        },
        {
          path:'/Studentlabshow',
          name:'Studentlabshow',
          component:labshow
        },
        {
          path:'/Studentlabstate',
          name:'Studentlabstate',
          component:labstate
        },
        {
          path:'/Studentqueshow',
          name:'Studentqueshow',
          component:queshow
        },
        {
          path:'/Studentquenumber',
          name:'Studentquenumber',
          component:quenumber
        },
        {
          path:'/Studentquestate',
          name:'Studentquestate',
          component:questate
        },
        {
          path:'/Studentqueservice',
          name:'Studentqueservice',
          component:queservice
        },
        {
          path:'/Studentteachcourse',
          name:'Studentteachcourse',
          component:teachcourse
        },
        {
          path:'/Studentteachproject',
          name:'Studentteachproject',
          component:teachproject
        },
        {
          path:'/Studentteachbook',
          name:'Studentteachbook',
          component:teachbook
        },
        {
          path:'/Studentteachrule',
          name:'Studentteachrule',
          component:teachrule
        },
        {
          path:'/Studentteachers',
          name:'Studentteachers',
          component:teachers
        },
        {
          path:'/Studentpmessage',
          name:'Studentpmessage',
          component:pmessage
        },
        {
          path:'/Studentpscore',
          name:'Studentpscore',
          component:pscore
        },
        {
          path:'/Studentpproject',
          name:'Studentpproject',
          component:pproject
        },
        {
          path:'/Studentpreport',
          name:'Studentpreport',
          component:preport
        }]
    },


    {
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher,
      children:[
        {
          path: '/TeacherHome',
          name: 'TeacherHome',
          component: Home
        },
        {
          path:'/Teacherlabshow',
          name:'Teacherlabshow',
          component:labshow
        },
        {
          path:'/Teacherlabstate',
          name:'Teacherlabstate',
          component:labstate
        },
        {
          path:'/Teacherqueshow',
          name:'Teacherqueshow',
          component:queshow
        },
        {
          path:'/Teacherquenumber',
          name:'Teacherquenumber',
          component:quenumber
        },
        {
          path:'/Teacherquestate',
          name:'Teacherquestate',
          component:questate
        },
        {
          path:'/Teacherqueservice',
          name:'Teacherqueservice',
          component:queservice
        },
        {
          path:'/Teacherteachcourse',
          name:'Teacherteachcourse',
          component:teachcourse
        },
        {

          path: '/Teacherteachproject',
          name: 'Teacherteachproject',
          component: teachproject
        },
        {
          path:'/add-project',
          name:'add-project',
          component:addproject
        },
        {
          path:'/Teacherteachbook',
          name:'Teacherteachbook',
          component:teachbook
        },
        {
          path:'/Teacherteachrule',
          name:'Teacherteachrule',
          component:teachrule
        },
        {
          path:'/Teacherteachers',
          name:'Teacherteachers',
          component:teachers
        },
        {
          path:'/Teacherpmessage',
          name:'Teacherpmessage',
          component:pmessage
        },
        {
          path:'/add-score',
          name:'add-score',
          component:addscore
        },
        {
          path:'/read-report',
          name:'read-report',
          component:readreport
        }]
    },


    {
      path: '/Manager',
      name: 'Manager',
      component: Manager,
      children:[
        {
          path: '/ManagerHome',
          name: 'ManagerHome',
          component: Home
        },
        {
          path:'/deal-labshow',
          name:'deal-labshow',
          component:deallabshow
        },
        {
          path:'/deal-labstate',
          name:'deal-labstate',
          component:deallabstate
        },
        {
          path:'/deal-queshow',
          name:'deal-queshow',
          component:dealqueshow
        },
        {
          path:'/deal-quenumber',
          name:'deal-quenumber',
          component:dealquenumber
        },
        {
          path:'/deal-questate',
          name:'deal-questate',
          component:dealquestate
        },
        {
          path:'/deal-queservice',
          name:'deal-queservice',
          component:dealqueservice
        },
        {
          path:'/deal-course',
          name:'deal-course',
          component:dealcourse
        },
        {
          path:'/deal-project',
          name:'deal-project',
          component:dealproject
        },
        {
          path:'/Managerteachbook',
          name:'Managerteachbook',
          component:teachbook
        },
        {
          path:'/Managerteachrule',
          name:'Managerteachrule',
          component:teachrule
        },
        {
          path:'/deal-teacher',
          name:'deal-teacher',
          component:dealteacher
        },
        {
          path:'/Managerpmessage',
          name:'Managerpmessage',
          component:pmessage
        },
        {
          path:'/Managerscore',
          name:'Managerscore',
          component:addscore
        }
      ]
    }
  ]
})
