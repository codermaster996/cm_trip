<script setup>
const user = [
  {
    name: "孙悟空",
    age: 18,
    address: "花果山",
    mount: "奥迪a8",
  },
  {
    name: "猪八戒",
    age: 28,
    address: "高老庄",
    mount: "奥迪a8",
  },
  {
    name: "沙和尚",
    age: 38,
    address: "流沙河",
    mount: "奥迪a8",
  },
]
</script>

<template>
  <div class="demo">
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>地址</th>
          <th>坐骑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in user">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.mount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
table {
  border-collapse: collapse;
  text-align: center;
}

thead {
  background: #eee;
}

th,
td {
  border: 1px solid black;
  padding: 8px 16px;
}
</style>
