<template>
  <div>
    <!-- name="css-class-group" tag="html-tag" -->
    <!-- name을 list로 정의하면 vue.js에서 제공하는 list관련 css 중 enter, leave등의 class를 사용할 수 있음 -->
    <transition-group name="list" tag="ul">    
      <!-- store.js에서 사용한 store을 사용  -->
      <li v-for="(todoItem, index) in this.storedTodoItems" :key="index" class="shadow">
        <i @click="toggleComplete({todoItem, index})" class="fa-solid fa-check checkBtn" :class="{checkBtnCompleted: todoItem.completed}"></i>
        <!-- v-bind:를 class에 동적인 값을 부여한다.  todoItem의 상태가 변경될 때 class를 실행-->
        <span :class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <!-- li에서 실행된 todoItem과 index를 받아온다. -->
        <span @click="removeTodo({todoItem, index})" class="removeBtn">
          <i class="fa-solid fa-trash-can"></i>
        </span>
      </li>
    </transition-group>
  </div> 
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  // App.vue에서 받은 todoItems의 데이터
  methods: {
    ...mapMutations({
      // Helper 함수는 인자를 선언하지 않아도 암묵적으로 값을 넘겨준다. 
      removeTodo : 'removeOneItem',
      toggleComplete : 'toggleCompleted'
    }),
  },
  computed : {
    // vue에서 권고하는 guide, 전역속성에 바로 접근하지 않는다.
    ...mapGetters(['storedTodoItems'])
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
  /* list-item transition */
  /* enter : 요소가 추가될 떄, leave : 요소가 없어질 때 */
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>