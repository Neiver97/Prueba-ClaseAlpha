import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/login/Login'
import CreateUser from '../views/usuario/CreateUser'
import Home from '../views/Home'
import CreateUserAuth from '../views/usuario/CreateUserAuth'
import firebase from 'firebase'

const routes = [
  {
    path:'/',
    name:'Home',
    component:Home,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name:'Login',
    component: Login
  },
  {
    path: '/createUser',
    name:'CreateUser',
    component: CreateUser,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/createUserAuth',
    name:'CreateUserAuth',
    component: CreateUserAuth
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  // to and from are both route objects. must call `next`.
  let user =firebase.auth().currentUser;
  let rutaAuth = to.matched.some(ruta=>ruta.meta.requiresAuth);
  console.log(user);
  if (rutaAuth && user===null) {
      next({
        name:'Login'
      });
    }else{
      next();
    }
});


export default router
