//import React, { useState } from "react";
import moment from 'moment/moment';
import { FaTrash,FaRegSquare,FaCheckSquare,FaEdit} from "react-icons/fa";
import { MarkTodoApi, deleteTodoApi } from "../../services/api";
import { toast } from "react-toastify";
import EditTodo from "./EditTodo";

function Todo({todo,setRefreshList}){
    const handleDelete=async()=>{
        const result=await deleteTodoApi({
            todo_id:todo._id

        });
        console.log('delete todo',result);
        if(result.data.status===200){
            setRefreshList(new Date());
            toast('Deleted');
        }else{
            toast("Failed to delete,please try again");
        }
    }

    const handleMark=async()=>{
        const result=await MarkTodoApi({
            todo_id:todo._id
        });
        console.log('Mark todo',result);
        if(result.data.status===200){
            setRefreshList(new Date());
            toast(result.data.message);
        }else{
            toast("Failed to Mark,please try again");
        }
    }
    

    
    return(<>
            <div className="col-lg-4">
                <div className="bs-component">
                    <div className="card  border-info mb-3" style={{ maxWidth: "20rem" }}>
                        <div className="card-header " >
                            {todo.isCompleted ? 'Completed':'Not Completed'}
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{todo.desc}</h4>
                            <p className="card-text ">
                                {moment(todo.date).fromNow()}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                                <button type="button" className="btn btn-border-info mx-2" onClick={handleDelete}>
                                    <FaTrash size={24} color="red"/> 
                                </button>
                                <button type="button"
                                className="btn btn-border-info mx-2"
                                 data-bs-toggle="modal"
                                 data-bs-target={`#exampleModal2-${todo._id}`}
                                >
                                    <FaEdit size={24} /> 
                                </button>
                                {/* <EditTodo /> */}
                                <button type="button" className="btn btn-border-info mx-1" onClick={handleMark} >
                                {todo.isCompleted ? <FaCheckSquare size={24} color="green"/> : <FaRegSquare size={24}/>}
                                </button>
                                {/* <div className="markTodo">
                                    <button>{todo.isCompleted ? 'Mark Incompleted' : 'Mark Completed'}</button>
                                </div> */}
                            </div>
                    </div>
                </div>
            </div>
           
        <EditTodo
          todoDesc={todo.desc}
          todoId={todo._id}
          setRefreshList={setRefreshList}
          
        />
   
    
    </>);
}
export default Todo;