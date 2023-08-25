import React,{ useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import {  useNavigate } from "react-router-dom";
// import todosData from "./todos.json"

import CreateTodo from "./partials/CreateTodo";
import Header from "./partials/Header";
import { getTodoListApi, getToken } from "../services/api.js";
import Todo from "./partials/Todo";

function Home(){
  
  const navigation=useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const [searchText,setSearchText]=useState("");
  const [showCompleted, setShowCompleted] = useState(null); // State to show completed todos

  const [list,setList]=useState([]);

  const [filteredList,setFilteredList]=useState([]);
  const [refreshList,setRefreshList]=useState();

  const todosPerPage = 6; // Number of todos per page
  const totalPages = Math.ceil(filteredList.length / todosPerPage);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredList.slice(indexOfFirstTodo, indexOfLastTodo);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(()=>{
    
    if(!getToken()){
      navigation("/login");
    }
    fetchTodoList();
  },[ refreshList]);

  useEffect(()=>{
    if (searchText === "" && showCompleted=== null) {
      console.log("Executed");
        setFilteredList(list);
    } else {
      const filtered = list.filter(todo =>
        todo.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      const finalFiltered = filtered.filter(todo => showCompleted === null || showCompleted === todo.isCompleted);
      setFilteredList(finalFiltered);
      setCurrentPage(1); // Reset currentPage when search text changes
    }
  }, [list, searchText, showCompleted]);
  async function fetchTodoList(){
    const result=await getTodoListApi();

    if(result.status===200 && result.data.status===200){
      setList(result.data.data.todos.reverse())
    }
  }
  
  return (
    <>
     <Header searchText={searchText} setSearchText={setSearchText} showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
    <div className="container mt-4">
  <div className="row">
    <div className="col-lg-3">
      <button
        type="button"
        className="btn  btn-border-info"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FaPlus size={30} color="yellow" /> Add Task
      </button>
    </div>
    <div className="col-lg-6">
      <div className="pagination justify-content-center">
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>
   
      <div className="container mt-4">
        <div className="row">
          {/* ... */}
        </div>
      </div>
      <div className="container" style={{height: 500}}>
        <div className="row justify-content-md-start mt-4">
                   {currentTodos.map(todo => (
  showCompleted === null || showCompleted === todo.isCompleted || showCompleted === "all" ?
  <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />
  : null
))}
          {
          filteredList.length===0 && <div className="notFoundTodos">
            No todos 
          </div>

          }

        </div>
      </div>
      {/* Pagination */}
      
      <CreateTodo  setRefreshList={setRefreshList}/>
       </>
    );
}
export default Home;