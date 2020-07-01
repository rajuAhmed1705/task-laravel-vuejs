<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.email"
            />
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="form.password"
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: "signin",
    components: {},
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions({
            signIn: "auth/signIn"
        }),
        submit() {
            this.signIn(this.form).then(() => {
                this.$router
                    .replace({
                        name: "task"
                    })
                    .catch(() => {
                        console.log("failed");
                    });
            });
        }
    }
};
</script>
