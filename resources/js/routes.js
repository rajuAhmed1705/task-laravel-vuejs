import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Task from "./pages/Task.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import store from "./store";

export const routes = [
    {
        name: "home",
        path: "/",
        component: Home,
    },
    {
        name: "about",
        path: "/about",
        component: About,
    },
    {
        name: "task",
        path: "/task",
        component: Task,
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
                return next({
                    name: "signin",
                });
            }
            next();
        },
    },
    {
        name: "signin",
        path: "/signin",
        component: SignIn,
    },
    {
        name: "signup",
        path: "/signup",
        component: SignUp,
    },
];
