<template>
  <div class="todo-item">
    <b-list-group-item class="d-flex justify-content-between align-items-center">
      <div v-if="!editing" @dblclick="editToto(todo)" :class="{ completed: isComplete }">
        <b-form-checkbox
          v-model="isComplete"
          @change="doneTodo"
          :checked="isComplete"
          class="float-left"
        ></b-form-checkbox>
        {{ todo.title }}
      </div>
      <b-form-input
        v-else
        v-model="title"
        placeholder="press esc to cancel"
        @keyup.enter="doneTodo"
        @blur="doneTodo"
        @keyup.esc="cancelEdit"
        v-focus
      ></b-form-input>
      <b-badge class="cursor-pointer" @click="deleteTodo(index, id)" variant="primary" pill>X</b-badge>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      isComplete: this.todo.isComplete,
      editing: this.todo.editing,
      beforeEditCache: this.todo.beforeEditCache
    };
  },
  directives: {
    focus: {
      inserted: el => el.focus()
    }
  },
  methods: {
    deleteTodo(index, id) {
      eventBus.$emit("deleteTodo", index, id);
    },
    editToto() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneTodo() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      axios
        .put("/tasks/" + this.id, {
          title: this.title
        })
        .then(response => {
          this.editing = false;
          eventBus.$emit("finishedEdit", {
            index: this.index,
            todo: {
              id: this.id,
              title: this.title,
              isComplete: this.isComplete,
              editing: this.editing
            }
          });
        })
        .catch(error => console.log(error));
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>
