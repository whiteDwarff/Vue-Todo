<template>
  <div>
    <ul>
      <!-- v-for 실행 시 순서를 부여해주는 index가 있다 (default) -->
      <li v-for="(todoItem, index) in todoItems" :key="todoItem.item" class="shadow">
        <i @click="toggleComplete(todoItem)" class="fa-solid fa-check checkBtn" :class="{checkBtnCompleted: todoItem.completed}"></i>
        <!-- v-bind:를 class에 동적인 값을 부여한다.  -->
        <span :class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <!-- li에서 실행된 todoItem과 index를 받아온다. -->
        <span @click="removeTodo(todoItem, index)" class="removeBtn">
          <i class="fa-solid fa-trash-can"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: [],
    }
  },
  // life cycle
  // 인스턴스가 생성되는 시점에 실행되는 함수
  created: function() {
    if(localStorage.length) {
      for(let i = 0; i < localStorage.length; i++) {
        // localStorage의 key의 개수만큼 반복해서 todoItems에 담기
        // data를 object로 변환해서 localStorage에서 가져온 i를 todoItems에 담아 ~~
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  },
  methods: {
    removeTodo: function(todoItem, index) {
      localStorage.removeItem(todoItem);
      // data에 저장된 todoItems의 배열에서 v-for실행시 생성된 index를 삭제함
      this.todoItems.splice(index);
    },
    toggleComplete: function(todoItem) {
      // NOT 연산자를 사용하여 true이면 false로, false면 true로 변경시킴 !!!!! 좋은 로직이네 ~~
      todoItem.completed = !todoItem.completed;
      // localStorage의 데이터 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  }
}
</script>

<style scoped>
  ul { 
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    text-align: left;
    }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background-color: #fff;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
    cursor: pointer;
  }
  .checkBtnCompleted {
    color: #b3adad;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
    cursor: pointer;
  }
</style>