<template>
  <div>
    <b-button
      v-if="showClearCompletedButton"
      @click="clearCompleted"
      variant="outline-primary"
      size="sm"
    >clear completed</b-button>
  </div>
</template>
<script>
export default {
  name: "todo-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      eventBus.$emit("clearCompletedTodos");
    }
  }
};
</script>
