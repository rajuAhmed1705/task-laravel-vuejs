<template>
    <div class="container">
        <div class="text-center" style="margin: 20px 0px 20px 0px;">
            <span class="text-secondary heading">Task Manager</span>
        </div>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link"
                        >Home</router-link
                    >
                    <router-link to="/task" class="nav-item nav-link"
                        >Task</router-link
                    >
                    <router-link to="/about" class="nav-item nav-link"
                        >About</router-link
                    >
                </div>
            </div>
        </nav>
        <br />
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>
<style>
.heading {
    font-size: 80px;
    font-weight: 600;
}
</style>
