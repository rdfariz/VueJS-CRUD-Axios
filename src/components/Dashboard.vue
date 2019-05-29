<template>
  <div id="dashboard">
    <form @submit.prevent="add">

        <div class="input-group mb-3">
          <input type="hidden" v-model="form.id">
          <input type="text" class="form-control rounded" placeholder="Username.."  v-model="form.name">
          <input type="text" class="form-control rounded ml-3" maxlength="50" placeholder="Describe your self.."  v-model="form.desc">
          <button class="btn btn-primary col-sm-12 col-md-2 mt-3 mt-md-0 ml-md-3" type="submit" v-show="!updateSubmit" :disabled="loading">Add</button> <!-- jika tidak update maka tombol update tidak muncul --> 
          <button class="btn btn-primary col-sm-12 col-md-2 mt-3 mt-md-0 ml-md-3" type="button" v-show="updateSubmit" @click="update(form)">Update</button> <!-- jika tombol edit di klik maka tombol add akan berubah menjadi update -->
        </div>

    </form>

    <div class="row">
      <div class="col-12 d-flex justify-content-start align-items-start flex-row flex-wrap">

        <div class="card col-12 col-md-6 col-lg-4" style="border-radius: 0;" v-for="user in users" :key="user.id">
          <div class="card-body">
            <h5 class="card-title">{{user.name}}</h5>
            <p class="card-text border-primary pl-2" style="border-left: 1.5px solid">{{user.desc}}</p>
            <button class="btn btn-primary mb-1 mb-md-0 mr-md-1 col-12 col-md-5" @click="edit(user)">Edit</button>
            <button class="btn btn-danger mt-1 mt-md-0 ml-md-1 col-12 col-md-5" @click="del(user)">Delete</button>
          </div>
        </div>
   
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
        form: {
          id: '',
          name: '',
          desc: ''
        },
        users: [],
        loading: false,
        updateSubmit: false
    }
  },
  mounted(){
    this.load();
  },
  methods: {
    load(){
  		axios({
  			method: 'get',
  			url: 'http://localhost:3000/users/'
  		})
  		.then(res => {
  			this.users = res.data //respon dari rest api dimasukan ke users
  		})
  		.catch ((err) => {
  			this.alertError()
  		})
    },
    add(){
    	axios({
  		  method: 'post',
  		  url: 'http://localhost:3000/users/',
  		  data: this.form
		  })
      .then(res => {
        this.load()
        this.form.name = ''
        this.form.desc = ''
        this.alertSuccess()
      })
    },
    edit(user){ 
      this.updateSubmit = true
      this.form.id = user.id 
      this.form.name = user.name 
      this.form.desc = user.desc 
    },
    update(form){
    	axios({
  		  method: 'put',
  		  url: 'http://localhost:3000/users/' + form.id,
  		  data: {id: form.id, name: this.form.name, desc: this.form.desc}
		  })
      .then(res => {
        this.load()
        this.form.id = ''
        this.form.name = ''
        this.form.desc = ''
        this.updateSubmit = false
        this.alertSuccess()
      })
    },
    del(user){
        axios({
        	method: 'delete',
        	url: 'http://localhost:3000/users/' + user.id,	
        })
        .then(res =>{
          this.load()
          this.form.id = ''
	        this.form.name = ''
	        this.form.desc = ''
	        this.updateSubmit = false
          let index = this.users.indexOf(this.form.name)
          this.users.splice(index,1)
          this.alertSuccess()
        })
    },

    alertSuccess(){
        // Use sweetalert2
        this.$swal({
           type: 'success',
            title: 'Success',
            text: 'Data berhasil diproses!',
        });
    },
    alertError(){
        // Use sweetalert2
        this.$swal({
           type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    }

  }
}
</script>
