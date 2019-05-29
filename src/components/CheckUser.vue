<template>
    <div id="checkLogin">

    	<form @submit.prevent="checkLogin">
			<div class="alert" v-bind:class="{'alert-primary': alert.success, 'alert-danger': alert.error, 'alert-warning': alert.default}" role="alert">
			  {{message}}
			</div>
		    <div class="input-group mb-3">
		      <input type="text" class="form-control rounded" placeholder="Username.."  v-model="form.name">
		      <button class="btn btn-primary col-sm-12 col-md-2 mt-3 mt-md-0 ml-md-3" type="submit">Check user</button>
		    </div>

	    	<div class="col-12 d-flex justify-content-center align-items-center" v-if="info.status">
	    		
	    		<div class="card" style="width: 18rem;">
				  <div class="card-body text-center">
				  	<h2>{{info.name}} ({{info.id}})</h2>
				  	<p>{{info.desc}}</p>
				  </div>
				</div>

	    	</div>
    	</form>

    </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
    	return{
    		form: {
    			name: '',
    		},
	        users: [],
	        message: 'Input your name to check your account have registered',
	        alert: {
	        	success: false,
	        	error: false,
	        	default: true
	        },
	        info: {
	        	id: '',
	        	name: '',
	        	desc: '',
	        	status: false
	        }
    	}
    },
    mounted(){
    	this.load()
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
    	checkLogin(){
    		if(this.form.name == ''){
    			this.alert.error   = false;
    			this.alert.success = false;
    			this.alert.default = true;
    			this.message 	   = 'Input your name to check your account have registered';
    			this.info.status = false;
    		}else{
    			if(this.users.length == 0){
    				this.alert.default = false;
    				this.alert.success = false;
    				this.alert.error   = true;
    				this.message 	   = "Your account not exist";
    				this.info.status = false;
    			}else{
					for(let i = 0; i < this.users.length; i++){
		    			if(this.form.name.toUpperCase() == this.users[i].name.toUpperCase()){
		    				this.alert.error   = false;
		    				this.alert.default = false;
		    				this.alert.success = true;
		    				this.message 	   = "Your account success registered";

		    				this.info.id   = this.users[i].id;
		    				this.info.name = this.users[i].name;
		    				this.info.desc = this.users[i].desc;
		    				this.info.status = true;
		    				break;
		    			}else{
		    				this.alert.default = false;
		    				this.alert.success = false;
		    				this.alert.error   = true;
		    				this.message 	   = "Your account not exist";
		    				this.info.status = false;
		    			}
		    		}
    			}
    		}
    	}
    }
}
</script>