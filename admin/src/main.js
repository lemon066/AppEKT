import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

//import { TokenService } from './services/ApiServices/storage.service'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'

import { VueResponsiveComponents } from "vue-responsive-components"
import VueSweetalert2 from 'vue-sweetalert2'

import 'vue-input-dropdown/dist/vue-input-dropdown.css'
import VueInputDropdown from 'vue-input-dropdown/dist/vue-input-dropdown.common'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


import VueSessionStorage from 'vue-sessionstorage'



//***************** mis imports  ***********************************//
import login from './components/login'

import Home from './components/Areas/Home/Home'
import cUser from './components/Areas/Accounts/cUser'
import cRol from './components/Areas/Roles/cRol'
import RoltoUser from './components/Areas/Accounts/RoltoUser'
import rTabla from './components/Areas/Roles/rTabla'


Vue.config.productionTip = false

Vue.use(VueSidebarMenu)
Vue.use(VueRouter)
Vue.use(ElementUI, {locale})
Vue.use(VueResponsiveComponents)
Vue.use(VueSweetalert2)
Vue.use(VueInputDropdown)
Vue.use(VueMaterial)
Vue.use(VueSessionStorage)


window.axios = require('axios');

//window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';  
// window.axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*'  
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Vue.prototype.$http = window.axios


const routes =[

  {path:'/',alias:'',component:login},
  {path:'/components/Areas/Home/Home',alias:'/Home',component:Home},
  {path:'/components/Areas/Accounts/cUser',alias:'/Usuario',component:cUser},
  {path:'/components/Areas/Roles',alias:'/Rol',component:cRol},
  {path:'/components/Areas/Accounts/RoltoUser',alias:'/Asignacion',component:RoltoUser},
  {path:'/components/Areas/Roles/rTabla',alias:'/rTabla',component: rTabla}
  
]

const router = new VueRouter({
  routes, mode:'history',
  base: process.env.BASE_URL,
})


// router.beforeEach((to, from, next) => {
//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
//   const loggedIn = !!TokenService.getToken();

//   if (!isPublic && !loggedIn) {
//     return next({
//       path:'/components/Home/Home',
//       query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
//     });
//   }

//   // Do not allow user to visit login page or register page if they are logged in
//   if (loggedIn && onlyWhenLoggedOut) {
//     return next('/')
//   }

//   next();
// })





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
