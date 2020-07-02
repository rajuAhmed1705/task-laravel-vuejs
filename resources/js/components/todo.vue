<template>
  <div>
    <!-- <input type="text" placeholder @keyup.enter="addTodo()" v-model="newTodo" /> -->
    <b-form-input v-model="newTodo" placeholder="works to do" @keyup.enter="addTodo()"></b-form-input>
    <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index"></todo-item>
    <template v-if="showButton">
      <div class="row m-2">
        <todo-item-remaining class="col-md-4 col-12 mb-2" :remaining="remaining"></todo-item-remaining>
        <todo-item-filtered class="col-md-4 col-12 mb-2"></todo-item-filtered>
        <todo-clear-completed
          class="col-md-4 col-12 mb-2"
          :showClearCompletedButton="showClearCompletedButton"
        ></todo-clear-completed>
      </div>
    </template>
  </div>
</template>
<script>
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoItemRemaining from "./TodoItemRemaining";
import TodoItemFiltered from "./TodoItemFiltered";
import TodoClearCompleted from "./TodoClearCompleted";
axios.defaults.baseURL = "/api";

export default {
  name: "todo",
  components: {
    TodoItem,
    TodoItemRemaining,
    TodoItemFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      beforeEditCache: "",
      filter: "all",
      todos: []
    };
  },
  mounted: function() {
    axios
      .get("/tasks")
      .then(response => {
        let todoData = response.data;
        todoData.forEach(todo => {
          todo.editing = false;
        });
        this.todos = todoData;
      })
      .catch(error => console.log(error));
  },
  created() {
    eventBus.$on("deleteTodo", (index, id) => this.deleteTodo(index, id));
    eventBus.$on("finishedEdit", data => this.finishedEdit(data));
    eventBus.$on("filterChanged", filter => (this.filter = filter));
    eventBus.$on("clearCompletedTodos", () => this.clearCompleted());
  },
  beforeDestroy() {
    eventBus.$off("deleteTodo", (index, id) => this.deleteTodo(index, id));
    eventBus.$off("finishedEdit", data => this.finishedEdit(data));
    eventBus.$off("filterChanged", filter => (this.filter = filter));
    eventBus.$off("clearCompletedTodos", () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.isComplete).length;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.isComplete);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.isComplete);
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.isComplete).length > 0;
    },
    showButton() {
      return this.todos.length > 0;
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      axios
        .post("/tasks", {
          title: this.newTodo,
          isComplete: false
        })
        .then(response => {
          let todoData = response.data;
          todoData.editing = false;
          this.todos.push(todoData);
        })
        .catch(error => console.log(error));
      this.newTodo = "";
      this.idForTodo++;
    },
    deleteTodo(index, id) {
      axios
        .delete("/tasks/" + id)
        .then(response => {
          if (response.status == 200) {
            this.todos.splice(index, 1);
          }
        })
        .catch(error => console.log(error));
    },

    completed(todo) {
      axios
        .put("/tasks/" + todo.id, {
          isComplete: !todo.isComplete
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    clearCompleted() {
      this.todos.forEach(todo => {
        if (todo.isComplete) {
          axios
            .delete("/tasks/" + todo.id)
            .then(response => {
              if (response.status == 200) {
                this.todos = this.todos.filter(
                  todo => todo.id != response.data.id
                );
              }
            })
            .catch(error => console.log(error));
        }
      });
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  }
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
  color: gray;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .justify-content-end {
    justify-content: center !important;
  }
}
</style>
