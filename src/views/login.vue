<template>
    <div id="login">
        <div class="container">
            <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                        <h2>Admin Login</h2>
                        <p>Please enter your email and password</p>
                    </div>
                    <form @submit.prevent="login">

                        <div class="form-group">
                            <input v-validate="'required|email'" type="email" class="form-control" id="inputEmail" placeholder="Email Address" v-model="email" name="email">
                            <div v-show="errors.has('email')">
                                <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: ''
        }),

        methods: {
            login() {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        alert('sukses')
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
