<template>
  <div class="content-center">{{ remaining }} item(s) left</div>
</template>

<script>
export default {
  name: "todo-remaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>
<style>
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .content-center {
    text-align: center;
  }
}
</style>
