import React, { useEffect, useState } from "react";
import { register } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.js";

function Register(){
  const [form,setForm]=useState({
    name:"",
    username:"",
    email:"",
    password:""
  });
  const navigation=useNavigate();

  useEffect(()=>{
    const user=localStorage.getItem('user')
    if(user){
      navigation("/");
    }
  });
  const [errors,setErrors]=useState(null);
  const handleInputChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async()=>{
    console.log("form",form);
    const result=await register(form);
    if(result.status===200){
      if(result.data.status===201){
       setErrors(result.data.data);
       toast(result.data.message)
        return;
      }
      if(result.data.status===200){
        localStorage.setItem('user',JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
     if(result.data.status===202){
      toast(result.data.message)
        return;
      }
      

    }else{
      toast('Something went wrong, please try again')
    }
  }

    return(
    <>
    <Header/>
        <div className="container">
          <ToastContainer/>
            <div className="row justify-content-md-center mt-4">
                <div className="col-lg-5 card text-white bg-secondary mb-3">
                    
                    <div className="card-body">
                        <h4 class="card-title ">Register</h4>
                        <hr />
                        <form>
                        <div className="form-group">
    <label htmlFor="name" className="form-label mt-4">
      Name
    </label>
    <input
      type="text"
      name="name"
      className="form-control"
      
      onChange={handleInputChange}
      placeholder="Enter Name"
      fdprocessedid="3dda7p"
    />
     {
      errors?.name&&(
        <small id="emailHelp1" className="form-text text-warning">
     {errors.name.msg}
    </small>
      )
    }
  </div>
                        <div className="form-group">
    <label htmlFor="username" className="form-label mt-4">
      Username
    </label>
    <input
      type="text"
      className="form-control"
      name="username"
      onChange={handleInputChange}
      placeholder="Enter Username"
      fdprocessedid="3dda7p"
    />
     {
      errors?.username&&(
        <small id="emailHelp2" className="form-text text-warning">
     {errors.username.msg}
    </small>
      )
    }
  </div>
                        <div className="form-group">
    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      name="email"
      onChange={handleInputChange}
      aria-describedby="emailHelp"
      placeholder="Enter Your Email"
      fdprocessedid="3dda7p"
    />
     {
      errors?.email&&(
        <small id="emailHelp3" className="form-text text-warning">
     {errors.email.msg}
    </small>
      )
    }
  </div>

  <div className="form-group mb-5">
    <label htmlFor="password" className="form-label mt-4">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      name="password"
      onChange={handleInputChange}
      placeholder="Enter Password"
      
      fdprocessedid="wzjy9eq"
    />
     {
      errors?.password&&(
        <small id="emailHelp3" className="form-text text-warning">
     {errors.password.msg}
    </small>
      )
    }
  </div>
  <button type="button" onClick={handleSubmit} className="btn btn-primary">Register</button>
  </form>
                    </div>

                </div>
            </div>
        </div>
        
    </>
    );
}
export default Register;