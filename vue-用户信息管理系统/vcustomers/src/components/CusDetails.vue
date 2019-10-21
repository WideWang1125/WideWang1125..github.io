<template>
  <div class="detail container">
    <router-link to="/customers" class="btn btn-default">返回</router-link>
    <h1 class="page-header">
      {{customers.name}}
      <span class="pull-right">
        <router-link class="btn btn-primary" :to="'/edit/'+customers.id">编辑</router-link>
        <button class="btn btn-danger" @click="deleteCustomer(customers.id)">删除</button>
        </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item">
        <span class="glyphicon glyphicon-asterisk">{{customers.phone}}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-envelope">{{customers.email}}</span>
      </li>
    </ul>

    <ul class="list-group">
      <li class="list-group-item">
        <span class="glyphicon glyphicon-search">{{customers.education}}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-search">{{customers.gschool}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'cusdetails',
  data () {
    return {
      customers:""
    }
  },
  methods: {
    fetchCustomers(id){  //注意次数id参数
      this.$http.get("http://localhost:3000/users/"+id).then((response)=>{
        // console.log(response);
        this.customers=response.body;
      })
    },
    deleteCustomer(id){
      // console.log(id);
      this.$http.delete("http://localhost:3000/users/"+id).then((response)=>{
        this.$router.push({path:"/customers",query:{alert:"用户删除成功"}});
      })
    }
  },
  created() {
      this.fetchCustomers(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
