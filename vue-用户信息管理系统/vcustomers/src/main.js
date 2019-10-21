// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
Vue.use(VueResource);

//动态路由和组件设置
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//引入组件
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import CusDetails from './components/CusDetails'
import Edit from './components/Edit'

//定义组件
const routes = [
  {path:'/customers',component:Customers},
  {path:'/about',component:About},
  {path:'/add',component:Add},
  {path:'/customers/:id',component:CusDetails},
  {path:'/edit/:id',component:Edit,meta: {allowBack: false}},
  {path:'*',redirect:'/customers'} //表示默认直接显示Router页面
 
  // {path:'/content/:aid',component:Content}, ///:aid动态路由,可在路由后面传值

  
  ]
//实例化组件
const router=new VueRouter({
  routes  //缩写（routes:routes）
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})