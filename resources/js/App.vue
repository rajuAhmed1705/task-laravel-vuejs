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
                    <template v-if="authenticated">
                        <router-link to="/task" class="nav-item nav-link"
                            >Task</router-link
                        >
                        <span class="navbar-text">
                            {{ user.name }}
                        </span>
                        <a class="nav-link" href="#" @click.prevent="signOut"
                            >sign out</a
                        >
                    </template>
                    <template v-else>
                        <router-link to="/signin" class="nav-item nav-link"
                            >Sign In</router-link
                        >
                    </template>
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
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user",
        }),
    },
    methods: {
        ...mapActions({
            signOutAction: "auth/signOut",
        }),
        signOut() {
            this.signOutAction().then(() => {
                this.$router.replace({
                    name: "home",
                });
            });
        },
    },
};
</script>
<style>
.heading {
    font-size: 80px;
    font-weight: 600;
}
</style>
