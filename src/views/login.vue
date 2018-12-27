<template>
    <div id="login">
        <div class="container">
            <div class="login-form">
                <div class="main-div">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="panel">
                                <h2>Dashboard Studio</h2>
                                <p>Login</p>
                            </div>
                            <form @submit.prevent="login">

                                <div class="form-group">
                                    <input v-validate="'required'" type="text" class="form-control" id="inputEmail" placeholder="Email Address" v-model="username" name="username">
                                    <div v-show="errors.has('username')">
                                        <i v-show="errors.has('username')" class="fa fa-warning"></i>
                                        <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="password" v-validate="'required'" class="form-control" id="inputPassword" placeholder="Password" v-model="password" name="password">
                                    <div v-show="errors.has('password')">
                                        <i v-show="errors.has('password')" class="fa fa-warning"></i>
                                        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                    </div>
                                </div>

                                <div class="forgot">
                                    <a href="#">Forgot password? Contact Administrator</a>
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                        <div class="col-lg-6">
                            uhdieuwhiu
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            username: '',
            password: ''
        }),

        methods: {
            login() {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        this.$store.dispatch('login/login', this.$data)
                    } else {
                        alert('fill form with correct format')
                    }
                })
            }
        },

        name: 'login'
    }
</script>

<style>
    @import '../../public/style/login.css';
</style>
