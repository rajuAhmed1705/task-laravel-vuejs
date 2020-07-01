import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Task from "./pages/Task.vue";

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
    },
];
