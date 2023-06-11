<template>
  <div class="inputBox shadow">
    <!-- v-model : to-way binding -->
    <!-- v-on:keyup.enter="", enter를 사용해도 event 실행할거야 ~ -->
    <input type="text" v-model="newTodoItem" @keypress.enter="addTodo">
    <span class="addContainer">
      <i class="fa-solid fa-plus addBtn" @click="addTodo"></i>
    </span>
    <ModalVue v-if="showModal" @close="showModal=false">
      <!-- modal-header에 해당 요소를 삽입하여 재사용 -->
      <h3 slot="header">
        경고! 
        <i @click="showModal = false" 
        class="closeModalBtn fa-solid fa-xmark"></i>
      </h3>
      <div slot="body">Todo-List를 입력하세요!</div>
    </ModalVue>
  </div>
</template>

<script>
  import ModalVue from './common/ModalVue.vue';
export default {
  data() {
    return { 
      newTodoItem: "",
      showModal: false,
    }
  },
  methods: {    
    addTodo() {
      if(this.newTodoItem != '') {
        // App.vue로 보낼 event, 
        // '이벤트이름', parameter(newTodoItem)
        this.$emit('addTodoItem', this.newTodoItem);
        this.clearInput();
      } else {
        // input에 입력된 값이 ''일 경우
        this.showModal = !this.showModal
      }
    },
    clearInput() {
      this.newTodoItem = "";
    },
  },
  components: {
    ModalVue,
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
.closeModalBtn { 
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  color: #43b983;
}
</style>
