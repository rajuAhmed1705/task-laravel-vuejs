import store from "../store";
import axios from "axios";
store.subscribe(mutation => {
    switch (mutation.type) {
        case "auth/SET_TOKEN":
            if (mutation.payload) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${mutation.payload.access_token}`;
                localStorage.setItem("token", mutation.payload.access_token);
                localStorage.setItem("user", mutation.payload.user);
            } else {
                axios.defaults.headers.common["Authorization"] = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }

            break;

        default:
            break;
    }
});
