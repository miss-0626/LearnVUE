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
import study from '../components/showComponents/study'
import labshow from '../components/showComponents/labshow'
import labstate from '../components/showComponents/labstate'
import queshow from '../components/showComponents/queshow'
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
import deallabstate from '../components/showComponents/deal-labstate'
import dealquestate from '../components/showComponents/deal-questate'
import dealqueservice from '../components/showComponents/deal-queservice'
import dealcourse from '../components/showComponents/deal-course'
import dealproject from '../components/showComponents/deal-project'
import dealteacher from '../components/showComponents/deal-teacher'
import dealmessage from '../components/showComponents/deal-message'
import addproject from '../components/showComponents/add-project'
import addscore from '../components/showComponents/add-score'
import labdetail from '../components/showComponents/lab-detail'
import quedetail from '../components/showComponents/que-detail'
import coursedetail from '../components/showComponents/course-detail'
import teacherdetail from '../components/showComponents/teacher-detail'
import password from '../components/showComponents/password'
import plabque from '../components/showComponents/p-lab-que'

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
 /*   {
      path: '/lab-detail',
      name: 'lab-detail',
      component: labdetail
    },
    {
      path: '/que-detail',
      name: 'que-detail',
      component: quedetail
    },
    {
      path: '/course-detail',
      name: 'course-detail',
      component: coursedetail
    },
    {
      path: '/teacher-detail',
      name: 'teacher-detail',
      component: teacherdetail
    },*/
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
          path: '/Studentstudy',
          name: 'study',
          component: study
        },
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
          path:'/Studentpassword',
          name:'Studentpasswrod',
          component:password
        },
        {
          path:'/Studentpscore',
          name:'Studentpscore',
          component:pscore
        },
        {
          path:'/p-lab-que',
          name:'p-lab-que',
          component:plabque
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
        },
        {
          path: '/lab-detail',
          name: 'lab-detail',
          component: labdetail
        },
        {
          path: '/que-detail',
          name: 'que-detail',
          component: quedetail
        },
        {
          path: '/course-detail',
          name: 'course-detail',
          component: coursedetail
        },
        {
          path: '/teacher-detail',
          name: 'teacher-detail',
          component: teacherdetail
        }]
    },


    {
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher,
      children:[
        {
          path: '/Teacherstudy',
          name: 'study',
          component: study
        },
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
          path:'/Teacherpassword',
          name:'Teacherpassword',
          component:password
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
        },
        {
          path: '/lab-detail',
          name: 'lab-detail',
          component: labdetail
        },
        {
          path: '/que-detail',
          name: 'que-detail',
          component: quedetail
        },
        {
          path: '/course-detail',
          name: 'course-detail',
          component: coursedetail
        },
        {
          path: '/teacher-detail',
          name: 'teacher-detail',
          component: teacherdetail
        },]
    },


    {
      path: '/Manager',
      name: 'Manager',
      component: Manager,
      children:[
        {
          path: '/Managerstudy',
          name: 'Managerstudy',
          component: study
        },
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
          path:'/deal-message',
          name:'deal-message',
          component:dealmessage
        },
        {
          path:'/Managerpmessage',
          name:'Managerpmessage',
          component:pmessage
        },
        {
          path:'/Managerpassword',
          name:'Managerpassword',
          component:password
        },
        {
          path:'/Managerscore',
          name:'Managerscore',
          component:addscore
        },
        {
          path: '/lab-detail',
          name: 'lab-detail',
          component: labdetail
        },
        {
          path: '/que-detail',
          name: 'que-detail',
          component: quedetail
        },
        {
          path: '/course-detail',
          name: 'course-detail',
          component: coursedetail
        },
        {
          path: '/teacher-detail',
          name: 'teacher-detail',
          component: teacherdetail
        }]
    }
  ]
})
