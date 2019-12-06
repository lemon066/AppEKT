<template>
  
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Crear Roles</span>

  <el-divider></el-divider>
        
<el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="120px" class="demo-ruleForm" size="mini" >


  <el-form-item label="Nombre del Rol">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Guardar</el-button>
    <el-button @click="resetForm('ruleForm')">Limpiar</el-button>
  </el-form-item>
</el-form>

 <el-divider></el-divider>
<ul></ul>

<el-table
       :data="tableData"
    style="width: 100%"
    max-height="500"
    fit: true
    >

    <el-table-column
    fit= "true"
      fixed ="left"
      prop="id"
      label="Identificador"
      width="400">
    </el-table-column>

    <el-table-column
    fit = "true"
      fixed
      prop="name"
      label="Nombre Rol"
      width="250">
    </el-table-column>
 
    <el-table-column
      fixed="left"
      label="Operaciones"
      width="120">

      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
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
 export default {
    data() {

      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('Ingrese una contraseña'));
      //   } else {
      //     if (this.ruleForm.ConfirmPassword !== '') {
      //       this.$refs.ruleForm.validateField('ConfirmPassword');
      //     }
      //     callback();
      //   }
      // };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('Ingresa la contraseña nuevamente'));
      //   } else if (value !== this.ruleForm.Password) {
      //     callback(new Error('Las contraseñas no son identicas!'));
      //   } else {
      //     callback();
      //   }
      // };

      return {

        loading: true,
        ruleForm: {
          Name: '',
        },  
      tableData: [],
      
      errors: []

      };
    },


mounted() {
    this.GetAllRoles();
  },

    methods: {

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
     this.ruleForm.Name= ''
    },

  async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.post('http://localhost:59822/api/roles/create', 
              this.ruleForm
             )
        .then(response => {
                  this.ClearAll();
                  this.GetAllRoles();
                  this.loading= false;
            
                  console.log(response.data)
                  this.open1(' Registro agregado correctamente!');

                })
        .catch(error => {
              // return Promise.reject(error);
                if (error.response.data.modelState) {
                        
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
                       
                  this.loading= false;
                  this.errors= error.response.data.modelState;
                  //console.log(this.errors['model.Name']);
                  //console.log(this.errors['model.Name']['0']);
                  //this.open2(this.errors['model.Name']['0']);
                  this.open2(this.errors);
                } 
                else if (error.request) 
                {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
                this.loading= false;
                this.open2( error.request);
        
                } 
                else 
                {
                  //*****/ Something happened in setting up the request and triggered an Error
                  this.loading= false;
                  this.open2(error.message)

                 //console.log('GT5 Error', error.message);
              }
                //this.open2("Error 4", error.response.data.modelState);
              //this.error.push(valid.message)
              }                
            )
           
            } 
          else 
          {
            this.loading= false;
            //console.log('error submit!!');
            this.open2("Los campos no estan llenos correctamente");
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    async GetAllRoles(){
    
               this.loading= true;

              this.$http.get('http://localhost:59822/api/roles/GetAllRoles')
        .then(response => {
              
               this.loading= false;
              this.tableData = response.data;


        })
        .catch(e => {
           this.loading= false
        this.errors.push(e)
        })
    }

    }
  }

</script>





