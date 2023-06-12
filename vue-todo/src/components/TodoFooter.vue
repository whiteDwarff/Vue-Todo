<template>
  <div class="clearAllContainer">
    <span @click="clearTodo" class="clearBtn">Clear All</span>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  methods: {
    ...mapMutations(['clearTodo'])
  }
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
}
.clearBtn {
  color: #f00;
  display: block;
  cursor: pointer;
}
</style>