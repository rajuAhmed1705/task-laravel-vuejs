<template>
    <div class="d-flex justify-content-center">
        <b-button
            variant="outline-primary"
            class="ml-1 mr-1"
            size="sm"
            :class="{ active: filter == 'all' }"
            @click="changeFilter('all')"
            >all</b-button
        >
        <b-button
            variant="outline-primary"
            class="ml-1 mr-1"
            size="sm"
            :class="{ active: filter == 'active' }"
            @click="changeFilter('active')"
            >active</b-button
        >
        <b-button
            variant="outline-primary"
            class="ml-1 mr-1"
            size="sm"
            :class="{ active: filter == 'completed' }"
            @click="changeFilter('completed')"
            >completed</b-button
        >
    </div>
</template>
<script>
export default {
    name: "todo-filtered",
    data() {
        return {
            filter: "all"
        };
    },
    methods: {
        changeFilter(filter) {
            this.filter = filter;
            eventBus.$emit("filterChanged", filter);
        }
    }
};
</script>
