<template>
  <div class="inputBox shadow">
    <!-- v-model : to-way binding -->
    <!-- v-on:keyup.enter="", enter를 사용해도 event 실행할거야 ~ -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <span class="addContainer">
      <i class="fa-solid fa-plus addBtn" @click="addTodo"></i>
    </span>
  </div>
</template>

<script>
export default {
  data : function() {
    return { 
      newTodoItem: "",
    }
  },
  methods: {    
    addTodo : function() {
      if(this.newTodoItem != '') {
        // App.vue로 보낼 event, 
        // '이벤트이름', parameter(newTodoItem)
        this.$emit('addTodoItem', this.newTodoItem)
        this.clearInput();
      }
    },
    clearInput : function() {
      this.newTodoItem = "";
    }

  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 0 auto;
}
.inputBox input{
  border-style: none;
  font-size: 0.9rem;
  width: 100%;
}
.addContainer {
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: #fff;
  vertical-align: middle;
}
</style>
