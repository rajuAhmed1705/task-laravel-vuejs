<template>
  <div class="d-flex justify-content-end">
    <b-button
      class="w-sm-100"
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

<style>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .w-sm-100 {
    width: 100%;
  }
}
</style>
