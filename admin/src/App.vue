<template>
  <div id="app" style="resize: horizontal; overflow: hidden;" >

    <sidebar-menu :menu="menu"/>
    <!-- <HelloWorld/> -->
    <login></login>
    
    <div class="block" style="
    margin-left: 50px;">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>


    export default {
  
      name:'app',
        data() {
          return {
            menu: [
          {
                        header: true,
                        title: 'Main Navigation',
                        hidden: true,
                        hiddenOnCollapse: true
                    },
                    {
                        href: '/components/Areas/Home/Home',
                        title: 'Principal',
                        icon: 'fa fa-user'
                    },
                    {
                        
                        title: 'Configuración',
                        icon: 'fa fa-chart-area',
                        child: [
                            {
                                href: '/components/Areas/Accounts/cUser',
                                title: 'Usuarios'
                            },
                            {
                                href: '/components/Areas/Roles',
                                title: 'Roles'
                            },
                            {
                                href: '/components/Areas/Accounts/RoltoUser',
                                title: 'Permisos'
                            },
                            {
                                href: '/components/Areas/Roles/rTabla',
                                title: 'tabla'
                            }

                        ]
                    }
            ]
          }
        },

methods:{


    logOut() {
      const token = sessionStorage.getItem('token')
      const URL = 'http://localhost:59822/oauth/token'/{token}
      this.$axios({
        method: 'get',
        url: URL,
        headers: {
          Accept: 'application/json'
        }
      })
        .then(_ => {
          sessionStorage.removeItem('token', _)
          this.$router.push('/login')
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    }



}



    }
</script>









<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>
