import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createTodoApi } from "../../services/api";

function CreateTodo({setRefreshList}){
  const [todoDesc, setTodoDesc] = useState(""); // State for the text area value
  //const [validationError, setValidationError] = useState(""); // State for validation error

  
  const handleTodoSubmit = async() => {
    if (todoDesc.trim() === "") {
      toast('Todo is required');
      return
     
    } 
    const result=await createTodoApi({desc:todoDesc});
    if(result.status===200 && result.data.status===200){
      toast('Todo added');
      setRefreshList(new Date())
      setTodoDesc('');
    }else{
      toast(result.data.message);
    }
  }

    return(
        <>

           {/* start Modal */}
<div class="modal" id="exampleModal">
  <ToastContainer/>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add New Todo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" fdprocessedid="3xmvka">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <div className="form-group">
             <textarea
                  name=""
                  className="form-control"
                  rows={3}
                  placeholder="Enter Todo"
                  value={todoDesc}
                  onChange={(e)=>{setTodoDesc(e.target.value)}}
                ></textarea>
                
        </div>
      </div>
      <div class="modal-footer">
      <button
                type="button"
                className="btn btn-primary"
                onClick={handleTodoSubmit}
                data-bs-dismiss="modal"
                fdprocessedid="6xu1es"
              >
                Save changes
              </button>
        <button type="button" onClick={()=>{setTodoDesc('')}} class="btn btn-secondary" data-bs-dismiss="modal" fdprocessedid="zpmtb">Close</button>
      </div>
    </div>
  </div>
</div>
            {/* End Modal */}
        </>
    );
}
export default CreateTodo;