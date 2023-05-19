<template>
  <div>
    <input type="text" v-model="newTodoItem">
    <button @click="addTodo">add</button>
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
      console.log(this.newTodoItem);

      localStorage.setItem("ad", this.newTodoItem);
      // 저장하는 로직
      this.newTodoItem = "";
    },

  }
}
</script>

<style>

</style>