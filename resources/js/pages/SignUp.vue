<template>
    <div class="col-md-10 col-sm-12 m-auto">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="exampleInputName">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleInputName"
                    aria-describedby="emailHelp"
                    v-model="form.name"
                />
            </div>
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
            <div class="form-group">
                <label for="exampleInputPasswordConfirm"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPasswordConfirm"
                    v-model="form.password_confirmation"
                />
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: "signup",
    components: {},
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
    },
    methods: {
        ...mapActions({
            signIn: "auth/signUp"
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
