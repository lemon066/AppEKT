<template>
 
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Asignar Roles a Usuario</span> 
</div>

<div  class="text item">    
    
    <div>Seleccione o digite usuario</div>

    <el-select  v-model="id" value-key="value" filterable  placeholder="Seleccione usuario" @change="handleSelect"  >
    <el-option
      v-for="item in tableUsers"
      :key="item.id"
      :label="item.userName + ' - ' + item.fullName"
      :value="item.id"
      >
    </el-option>
  </el-select>

    <el-divider></el-divider>
    <el-table
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
     max-height="400"
>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      fixed
      prop="name"
      label="Nombre Rol"
      width="250">
    </el-table-column>

     <el-table-column
      fixed
      prop="id"
      label="Identificador"
      width="350">
    </el-table-column>

    </el-table>

  </div>
</el-card>
</template>

<script>
  export default {
    data() {
      return {

        loading: true,
        tableData: [
          {
            name: '',
            id: ''
          }
        ],
        multipleSelection: [],
        tableUsers:[
          {
            id: '',
            userName: '',
            fullName: '',
            roles: []
          }
        ],
         id: ''
         ,
         searchRol :[]
      }
    },

    
mounted() {
    this.GetAllRoles();
    this.getUser();
  },

methods: {

    handleEdit(index, row) {
        console.log(index, row);
      },

    handleDelete(index, row) {
        console.log(index, row);
      },

    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

       handleSelectionChange(val) {
        this.multipleSelection = val;
      },

    // handleSelectionChange(val) {

    //     console.log(val);

    //     // this.multipleSelection = val;
    //     // console.log(this.multipleSelection);
    //     // console.log("multiple selección")


    //     //console.log(val[0].id);
    //     //alert('this is selected Index ' + this.multipleSelection[0])
    //   },

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

    
    async GetAllRoles(){

       this.loading= true,
        this.$http.get('http://localhost:59822/api/roles/GetAllRoles')
        .then(response => {
        this.loading= false,
        this.tableData = response.data;
       //this.open1(response.data.message);
       this.open1("Lista de roles disponibles cargada");
        })
        .catch(e => {
          this.loading= false
            this.open2(e.message);
        this.errors.push(e)
        })
    },

    async getUser(){
    
              this.loading = true;
              this.$http.get('http://localhost:59822/api/accounts/users')
        .then(response => {
              
            //console.log(response.data);
            this.tableUsers = response.data;
            this.searchRol = response.data;
            this.loading = false;
            this.open1("Lista de usuarios registrados cargada");

            //console.log(this.searchRol[0].roles[0]);
            //console.log(this.searchRol[8].roles[0]);
                
              
        })
        .catch(e => {
          this.loading=false;
          this.errors.push(e)
          this.open2("Error al cargar lista de usuarios!")
        

        })
    },

       handleSelect(item) {
         console.log(item);
         this.buscaRoles(item);        
      },

       onChange(event) {
              console.log(event.target.value);
          },

        buscaRoles (item)
        {
                           
          
           this.searchRol= '';

            for(var i=0; i < this.tableUsers.length; i++)
            {
              if( this.tableUsers[i].roles != '' && this.tableUsers[i].id== item ) 
              {
               // lista_roles = this.tableUsers[i].roles
              //console.log("encontrado", this.searchRol[i].roles);
              //console.log(lista_roles);
              this.searchRol = this.tableUsers[i].roles;
              //console.log("lista roles" , this.searchRol);             
              }
            }

          var posicion_roles = null;

          if(this.searchRol)
          {

                console.log("usuario tiene");
                  
                 for (var j = 0; j< this.searchRol.length; j++)
                  {
                    for (var m =0; m< this.tableData.length; m++)
                    {
                      if (this.tableData[m].name == this.searchRol[j])
                        {             
                           // posicion_roles = this.tableData[m];
                           posicion_roles = m;
                           this.toggleSelection([this.tableData[m]]);
                           console.log("tiene roles en index",posicion_roles);          
                      }
                    }
                  }
          }
          else{
            console.log("usuario no tiene");
            this.toggleSelection();
          }



              
          // if (this.searchRol){
          //     if (this.tableData.name == this.searchRol){
          //           console.log()
          //     }
          // }
     

          // if (lista_roles) {
          //   this.tableData.forEach(Selection => {
          //   this.$refs.multipleTable.toggleRowSelection(Selection);
          //   });
          //   } else 
          //   {
          //     this.$refs.multipleTable.clearSelection();
          //   }


            // var lista_roles =[];

            // for(var i=0; i < this.searchRol.length; i++)
            // {
            //   if( this.searchRol[i].roles != '') 
            //   {
            //     lista_roles = this.searchRol[i].roles
            //   //console.log("encontrado", this.searchRol[i].roles);
            //   console.log(lista_roles);
            //   }
            // }

            // if (lista_roles.length>0)
            // {

            //       for (var j =0; j< lista_roles.length; j++)
            //       {
                            
            //                 if( this.searchRol[j].name == lista_roles ) 
            //                   {
            //                   lista_roles = this.searchRol[j].roles
            //                   //console.log("encontrado", this.searchRol[i].roles);
            //                   console.log(lista_roles);
            //                   }
            //       }
            // }           
        
        }
    },
  }
</script>