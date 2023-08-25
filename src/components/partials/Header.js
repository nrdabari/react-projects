import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSync } from "react-icons/fa";

function Header({searchText,setSearchText,showCompleted,setShowCompleted}){
  const navigation=useNavigate();
  const [user,setUser]=useState(null);
  
  useEffect(()=>{
  const user=localStorage.getItem('user');
  setUser(user);
  },[]);
  const handleLogout=()=>{
    localStorage.clear();
    navigation("/login");
  }
  const handleRefresh = () => {
    setSearchText(""); // Clear the search text
    setShowCompleted(null); // Reset the showCompleted state
    
  };
    return(
      <>
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Todo App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
        
        {
          user ?
          <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>Logout</button>
        </li>
       :
       <>
       <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>
        }
        
      </ul>
      {
        user && <form className="d-flex">
          {/* Refresh button */}
          <button className="btn btn-primary mx-3" onClick={handleRefresh}>
                  <FaSync size={26} color="white"/>
                </button>
         {/* Dropdown to filter todos */}
         <select
                  className="form-select me-sm-2"
                  value={showCompleted === null ? "all" : showCompleted ? "completed" : "notCompleted"}
                  onChange={(e) => {
                    const value = e.target.value;
                    
                    if (value === "completed") {
                      setShowCompleted(true);
                      
                    } else if (value === "notCompleted") {
                      setShowCompleted(false);
                      
                      
                    } else if (value === "all") {
                      setShowCompleted(null);
                    }
                  }}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="notCompleted">Not Completed</option>
                </select>
      
        <input className="form-control me-sm-2" 
        type="search" 
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)} 
        placeholder="Search"
         />
       
      </form>
      }
     
    </div>
  </div>
</nav>
</>
    );
}
export default Header;