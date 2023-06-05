<template> 
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput 
    v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- TodoList로 todoItems 데이터를 전송 -->
    <TodoList
    :propsData="todoItems"
    v-on:removeTodo="removeOneItem"
    v-on:toggleComplete="toggleCompleted"></TodoList>
    <TodoFooter v-on:clearToDoList="clearTodo"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems: [],
    }
  },
  // life cycle
  // 인스턴스가 생성되는 시점에 실행되는 함수(localStorage에 값이 저장되는 순간에 ~~)
  created: function() {
    if(localStorage.length) {
      for(let i = 0; i < localStorage.length; i++) {
        // localStorage의 key의 개수만큼 반복해서 todoItems에 담기
        // data를 object로 변환해서 localStorage에서 가져온 i를 todoItems에 담아 ~~
        // key : 할일, value는 속성이 들어있다.
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  },
  methods: {
    addOneItem: function(newTodoItem) {
        const obj = {
          completed: false,
          item: newTodoItem
        };
        localStorage.setItem(newTodoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleCompleted: function(todoItem) {
      todoItem.completed = !todoItem.completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    clearTodo: function() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }

}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>