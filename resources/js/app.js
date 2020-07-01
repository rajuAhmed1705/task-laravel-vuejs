require("./bootstrap");
window.Vue = require("vue");

import App from "./App.vue";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import axios from "axios";
import { routes } from "./routes";

import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
window.eventBus = new Vue();

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import store from "./store/index";
require("./store/subscriber");

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

const app = new Vue({
    el: "#app",
    router: router,
    store,
    render: (h) => h(App),
});
