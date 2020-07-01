<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand" to="/">Task Manager</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/"
                            >Home
                            <span class="sr-only">(current)</span></router-link
                        >
                    </li>
                    <template v-if="authenticated">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/task"
                                >Task</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" to="/task">{{ user.name }}</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                @click.prevent="signOut"
                                >Sign Out</a
                            >
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signin"
                                >Sign In</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signup"
                                >Sign Up</router-link
                            >
                        </li>
                    </template>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about"
                            >About</router-link
                        >
                    </li>
                </ul>
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
