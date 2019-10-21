<!-- JSON SERVER网页 -->
http://localhost:3000

<!-- //获取所有用户的数据 -->
 http://localhost:3000/users

<!-- 获取单个id都用户ixnxi -->
  http://localhost:3000/users/1

  <!-- //获取所有公司都的数据 -->
 http://localhost:3000/companies

 <!-- 根据公司名字获取信息 -->
  http://localhost:3000/companies?name=apple

  <!-- 根据多个公司名字获取信息 -->
  http://localhost:3000/companies?name=Apple&name=Google

  <!-- 获取一页中只有两条数据 -->
  http://localhost:3000/companies?_page=1&_limit=2

  <!-- 排序显示  asc升序  desc降序 -->
   http://localhost:3000/companies?_sort=name&_order=asc

   <!-- 获取年龄23及以上的  age_lte表示最大限制-->
   http://localhost:3000/users?age_gte=23

   <!-- 搜索用户信息 -->
   http://localhost:3000/users?q=h