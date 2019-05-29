import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import Home from './components/Home.vue';
import CheckUser from './components/CheckUser.vue';
import Dashboard from './components/Dashboard.vue';
import '../node_modules/nprogress/nprogress.css';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueSweetalert2, options)

const routes = [
  {
	name: 'Home',
	path: '/',
	component: Home
  },
  {
	name: 'CheckUser',
	path: '/checkuser',
	component: CheckUser
  },
  {
	name: 'Dashboard',
	path: '/dashboard',
	component: Dashboard
  },
];

const router = new VueRouter({mode: 'history', routes});
router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
