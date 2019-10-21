<template>
  <div class="customers container">
    <v-alert  v-if="alert" :msg="alert"></v-alert>
   <h1 class="page-header">用户管理系统</h1>
   <input type="text" class="form-control" placeholder="搜索用户名" v-model="filterInput">
   <br>
   <table class="table table-striped">
     <thead>
       <tr>
         <th>姓名</th>
         <th>电话</th>
         <th>邮箱</th>
         <th></th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="customer in filterBy(customers,filterInput)"> <!--数组改为方法实现搜索-->
         <td>{{customer.name}}</td>
         <td>{{customer.phone}}</td>
         <td>{{customer.email}}</td>
         <td><router-link class="btn btn-default" :to="'/customers/'+customer.id">详情</router-link></td>
       </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'Customers',
  data () {
    return {
      customers:[],
      alert:"",
      filterInput:""
    }
  },
  methods: {
    fetchCustomers(){
      this.$http.get("http://localhost:3000/users").then((response)=>{
        // console.log(response);
        this.customers=response.body;
      })
    },
    filterBy(customers,value){
      return customers.filter((customer)=>{
        return customer.name.match(value); //实现搜索
      })
    }
  },
  components:{
    'v-alert':Alert,
  },
  created() {
    if(this.$route.query.alert){
      this.alert=this.$route.query.alert;  //判断弹窗要不要弹出
    }
    this.fetchCustomers();
  },
  updated() {
    this.fetchCustomers();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
