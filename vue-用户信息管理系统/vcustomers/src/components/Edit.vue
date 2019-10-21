<template>
  <div class="edit container">
    <h1 class="page-header">编辑用户</h1>
    <form v-on:submit="updataCustomer">
        <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
            <label>姓名</label>
            <input type="text" class="form-control" placeholder="name" v-model="customer.name">
        </div>
        <div class="form-group">
            <label>电话</label>
            <input type="text" class="form-control" placeholder="phone" v-model="customer.phone">
        </div>
        <div class="form-group">
            <label>邮箱</label>
            <input type="text" class="form-control" placeholder="email" v-model="customer.email">
        </div>
        <div class="form-group">
            <label>学历</label>
            <input type="text" class="form-control" placeholder="education" v-model="customer.education">
        </div>
        <div class="form-group">
            <label>毕业学校</label>
            <input type="text" class="form-control" placeholder="gschool" v-model="customer.gschool">
        </div>
        <div class="form-group">
            <label>职业</label>
            <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
        </div>
        <div class="form-group">
            <label>个人简介</label>
            <!-- <input type="text" class="form-control" placeholder="profile" v-model="customer.profile"> -->
            <textarea class="form-control" rows="10" placeholder="" v-model="customer.profile"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">提交</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      customer:{}
    }
  },
  methods: {
    //   confirm(){
    //       if(confirm("确定离开编辑！")){
         
    //     }else{
    //         return false;
    //   }
    //   },
      fetchCustomer(id){
        this.$http.get("http://localhost:3000/users/"+id).then((response)=>{
            // console.log(response);
            this.customer=response.body;
        })
      },
      updataCustomer(e){
        //   console.log(111);
        if(!this.customer.name||!this.customer.phone||!this.customer.email){
            alert("请输入对应信息！");
        }else if( confirm("请确认提交信息！")){
            var updataCustomer={
                name:this.customer.name,
                email:this.customer.email,
                phone:this.customer.phone,
                education:this.customer.education,
                gschool:this.customer.gschool,
                profession:this.customer.profession,
                profile:this.customer.profile
            }
            //put更新id对应数据
            this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updataCustomer).then((response)=>{
                // console.log(response);
                this.$router.push({path:'/customers',query:{alert:"用户信息更新成功！"}});  //query:传递个弹窗消息
            })
            e.preventDefault();//阻止默认事件
        }else{
            return false;
        }
          e.preventDefault();//阻止默认事件
      }
  },
  created() {
      this.fetchCustomer(this.$route.params.id);
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
