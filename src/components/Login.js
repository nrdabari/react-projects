import React, { useEffect, useState } from "react";
import { login } from '../services/api.js';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./partials/Header.js";
function Login(){
  
    const[form,setForm]=useState({
      email:"",
      password:"",

    });
    
    const navigation=useNavigate();
    useEffect(()=>{
      const user=localStorage.getItem('user')
      if(user){
        navigation("/");
      }
    });
    const [errors,setErrors]=useState(null);

    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async()=>{
      console.log("form",form);
      const result=await login(form);
      console.log("form",result);
      setErrors(null);
      
      if(result.status===200){
        if(result.data.status===200){
          localStorage.setItem('user',JSON.stringify(result.data.data));
          navigation("/");
          return;
        }
        if(result.data.status===201){
            setErrors(result.data.data);
            console.log("error",result.data.data);
            return;
        }
        if(result.data.status===202){
          console.log("error1",result.data.data);
          toast(result.data.message);
          return;
      }
      }
    }
    return(
      <>
      <Header/>
        <div className="container">
          <ToastContainer />
            <div className="row justify-content-center mt-4">
                <div className="col-lg-5 card text-white bg-secondary mb-3">
                
  <div class="card-body">
    <h4 class="card-title">Login Now</h4>
    <hr />
    <form>
    <div className="form-group">
    <label htmlFor="exampleInputEmail1" className="form-label mt-4">
      Email address
    </label>
    <input
      type="email"
      onChange={handleChange}
      name="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder="Enter email"
      autoComplete="email"
      fdprocessedid="3dda7p"
    />
    {
      errors?.email&&(
        <small id="emailHelp" className="form-text text-danger">
     {errors.email.msg}
    </small>
      )
    }
    
  </div>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label mt-4">
      Password
    </label>
    <input
      type="password"
      onChange={handleChange}
      name="password"
      className="form-control"
      id="exampleInputPassword1"
      placeholder="Enter Password"
      autoComplete="current-password"
      fdprocessedid="wzjy9eq"
    />
    {
      errors?.password&&(
        <small id="emailHelp" className="form-text text-danger">
     {errors.password.msg}
    </small>
      )
    }
  </div>
  <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
  </form>
  </div>
                </div>
            </div>
        </div>
        </>
    );
    
}
export default Login;