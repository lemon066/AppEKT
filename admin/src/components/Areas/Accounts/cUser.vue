<template>
  
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Crear usuario</span>

  <el-divider></el-divider>
        
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="mini" >
   <el-form-item
    prop="email"
    label="Email"
    :rules="[
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>

  <el-form-item label="Nombre Usuario">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>

  <el-form-item label="Primer Nombre">
    <el-input v-model="ruleForm.firstname"></el-input>
  </el-form-item>

  <el-form-item label="Primer Apellido">
    <el-input v-model="ruleForm.lastname"></el-input>
  </el-form-item>

  <el-form-item label="Password" prop="Password">
    <el-input type="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
  </el-form-item>
  
  <el-form-item label="Confirme Password" prop="ConfirmPassword">
    <el-input type="password" v-model="ruleForm.ConfirmPassword" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Guardar</el-button>
    <el-button @click="resetForm('ruleForm')">Limpiar</el-button>
  </el-form-item>
</el-form>

 <el-divider></el-divider>

<el-table
  v-loading="loading"
    :data="tableData"
    style="width: 100%"
    max-height="250"
    fit: true
    >

    <el-table-column
      fixed
      prop="id"
      label="Identificador"
      width="300">
    </el-table-column>

    <el-table-column
      prop="userName"
      label="Nombre Usuario"
      width="180">
    </el-table-column>
    <el-table-column
      prop="fullName"
      label="Nombre Completo"
      width="250">
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      width="200">
    </el-table-column>

    <el-table-column
      prop="joinDate"
      label="Fecha Registro"
      width="300">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="Operaciones"
      width="120">

      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, scope.row)"
          type="danger"
          size="small">
          Eliminar
        </el-button>
      </template>
    </el-table-column>
  </el-table>


</div> 
</el-card>
</template>


<script>


const axios = require('axios').default;


 export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Ingrese una contraseña'));
        } else {
          if (this.ruleForm.ConfirmPassword !== '') {
            this.$refs.ruleForm.validateField('ConfirmPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Ingresa la contraseña nuevamente'));
        } else if (value !== this.ruleForm.Password) {
          callback(new Error('Las contraseñas no son identicas!'));
        } else {
          callback();
        }
      };
      return {

          loading: true,
          ruleForm: {
          email: '',
          username: '',
          firstname: '',
          lastname: '',
          Password: '',
          ConfirmPassword: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
      
      tableData: [
        {
            id: '',
            userName: '',
            fullName: '',
            email: '',
            joinDate: ''
        }
      ],
      
       errors: [],
       id: ''

      };
    },


mounted() {

    this.isOpen= false;
    this.getUser();

  },

    methods: {

    // postPost() {
    // axios.post('http://localhost:59822/api/accounts/create', {
    //   body: this.ruleForm
    // })
    // .then(response => {})
    // .catch(e => {
    //   this.errors.push(e)
    // })
    // },
  
    // async postPost() {
    // this.$http.post('http://localhost:59822/api/accounts/create', {
    //   createUserModel: this.ruleForm
    // })
    // .then(response => {})
    // .catch(e => {
    //   this.errors.push(e)
    // })
    // },

  
   open1(msg) {
        this.$notify({
          title: 'Success',
          message: msg,
          type: 'success'
        });
      },

      open2(msg) {
        this.$notify({
          title: 'Warning',
          message: msg,
          type: 'warning'
        });
      },


    ClearAll(){
     this.ruleForm.email= '',
     this.ruleForm.username= '',
     this.ruleForm.firstname= '',
     this.ruleForm.lastname= '',
     this.ruleForm.Password= '',
     this.ruleForm.ConfirmPassword= ''
        
    },

async submitForm(formName) {
         this.loading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
              this.$http.post('http://localhost:59822/api/accounts/create', 
              this.ruleForm
             )
        .then(response => {

                  this.ClearAll();
                  this.getUser();

                   this.loading = false;

                  this.open1(response.data.message);
                  console.log(response.data);
                })
        .catch(error => {

                if (error.response.data.modelState) {
                 
                  this.loading= false;
                  this.errors= error.response.data.modelState;
                  this.open2(this.errors);
                } 
                else if (error.request) 
                {
                  this.loading= false;
                //this.open2("Error request 2");
                this.errors= error.response.data;
                this.open2(this.errors)
                }
                           
              else if (error.response.status == 400) 
              {
                  this.errors= error.response.data;
                  this.open2(this.errors);
              }
              else 
              {
                  //*****/ Something happened in setting up the request and triggered an Error
                
                     this.errorStatus = error.response.data.message;
                     this.loading= false;
                     this.open2("error status 3");
              }
              }                
            )
           
            } 
          else 
          {
            //console.log('error submit!!');
            this.loading= false;
            this.open2("los campos a llenar estan incompletos");
            return false;
          }
        });
      },


async deleteRow(index, row) {

     this.loading= true;
     this.id = row.id;
     
    const token = localStorage.getItem('acces_token');
  
    //console.log(token);
  
      const URL = 'http://localhost:59822/api/accounts/user/'

      axios({
        method: 'delete',
        url: URL,
        data: this.id,
        headers: {
           'Accept':'application/json',
          'Content-type' : 'application/json',
          'Authorization' : 'beare '+ token 
         
        }
      })
        .then(res => {
          this.loading= false;
          console.log(res.message);
          this.$router.push('/components/Areas/Accounts/cUser')
        })
        .catch(err => {
          this.loading = false;
          alert('Error con la autenticación', err)
          // eslint-disable-next-line
          console.log(err.message);
        })


        // this.$http.post('http://localhost:59822/api/accounts/user/' + this.id)
        // .then(response => {    
        // this.loading= false;
        // this.tableData = response.data;
        // this.open1(response.data.message);
        // })
        // .catch(e => {
        //   this.loading= false;
        //   this.open2(e.message);
        // this.errors.push(e)
        // })      




      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

async getUser(){
    
               this.loading = true;

              this.ClearAll();
              this.$http.get('http://localhost:59822/api/accounts/users')
        .then(response => {
              //console.log(response.data)
              this.tableData = response.data;
             this.isOpen = true;
             this.loading = false;
              
        })
        .catch(e => {
        this.errors.push(e)
        //alert(this.errors.push(e));


        })
    }

    }
  }

</script>







