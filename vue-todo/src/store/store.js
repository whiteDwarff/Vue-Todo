import Vue from 'vue'
import Vuex from 'vuex'

// use : vue의 plugin, global function
//       모든 components에서 사용가능하게 하겠다 ~
Vue.use(Vuex);

const storage = {
  fetch() {
    // localStorage의 data를 담을 변수 
    let arr = [];
    // localStorage의 길이만큼 for문 동작
    if(localStorage.length) {
      for(let i = 0; i < localStorage.length; i++) {
        // JSON 형식의 data를 arr에 push
        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    // 모든 data가 push되면 state의 데이터로 전송
    return arr;
  },
}

export const store = new Vuex.Store({ 
  state : {
    todoItems: storage.fetch()
  },
  getters : {
    // parameter로 state가 들어와야 한다.
    storedTodoItems(state) {
      return state.todoItems;
    }
  },
  // function의 인자로 state를 가져옴 , state를 handling 하는 유일한 method의 집합
  mutations : {
    addOneItem(state, todoItem) {
      const obj = {
        completed: false,
        item: todoItem
      };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleCompleted(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed; 
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
    },
    clearTodo(state) {
      localStorage.clear();
      state.todoItems = [];
    }
  },
  actions : {
    // 비동기적 코드들의 집합,
    // 사용자의 의해 제어되는 event 등..
    // dispatch()를 사용하여 actions의 function 호출
    // : this.$store.dispatch('function');
    }
});