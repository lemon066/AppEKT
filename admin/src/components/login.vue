<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="https://vuematerial.io/assets/logo-color.png">
        <div class="md-title">Vue Material</div>
        <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div>
      </div>

      <div class="form">

        <md-field>
          <label>Usuario</label>
          <md-input v-model="login.userName" autofocus></md-input>
        </md-field>


        <!-- <md-field>
          <label>E-mail</label>
          <md-input v-model="login.email" autofocus></md-input>
        </md-field> -->

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>

const axios = require('axios').default;

export default {
  name: "App",
  data() {
    return {
      loading: false,
      login: {
        userName: "",
        password: ""
        //grant_type: "password"
      }
    };
  },


  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;

        this.loginUser();
        

      }, 5000);
    },

   loginUser() {
  
    var data = 
    {
      username :  this.login.userName,
      password : this.login.password,
      grant_type : 'password'
    }

  let esc = encodeURIComponent;
  let query = Object.keys(data).map(k => esc(k) + "=" + esc(data[k])).join("&");
    
      const URL = 'http://localhost:59822/oauth/token'

      axios({
        method: 'post',
        url: URL,
        data: query,
        headers: {
      'Accept':'application/json',
      'Content-type':'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          localStorage.setItem('acces_token',res.data.access_token);
          this.$router.push('/components/Areas/Home/Home');

        })
        .catch(err => {
          alert('Error con usuario/password')
          // eslint-disable-next-line
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
  
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
