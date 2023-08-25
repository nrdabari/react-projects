import React, { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { EditTodoApi } from "../../services/api.js";

function EditTodo({ todoDesc, todoId, setRefreshList}){
  const [newDesc, setNewDesc] = useState(todoDesc);

  useEffect(() => {
    setNewDesc(todoDesc); // Update newDesc when todoDesc prop changes
  }, [todoDesc]);
  const handleEdit = async () => {
    if (todoDesc.trim() === "") {
      toast('Todo is required');
      return
     
    } 
    const result = await EditTodoApi({
      todo_id: todoId,
      desc: newDesc
    });
    if (result.data.status === 200) {
      setRefreshList(new Date());
      setNewDesc(" ");
      toast(result.data.message);
    } else {
      toast("Failed to update, please try again");
    }
  }
  // console.log(initialDesc,todoId);
  // const [todoDesc, setTodoDesc] = useState(initialDesc);
 // State for the text area value
  //const [validationError, setValidationError] = useState(""); // State for validation error

  
    return(
        <>

           {/* start Modal */}
<div class="modal" id={`exampleModal2-${todoId}`}>
  <ToastContainer/>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add New Todo</h5>
        <button type="button" class="btn-close"  aria-label="Close" data-bs-dismiss="modal" fdprocessedid="3xmvka">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <div className="form-group">
        <textarea
                  name=""
                  className="form-control"
                  rows={3}
                  value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
                ></textarea>
                
        </div>
      </div>
      <div class="modal-footer">
      <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                
                fdprocessedid="6xu1es"
                onClick={() => {
                  handleEdit();
                  document.getElementById(`exampleModal2-${todoId}`).style.display =
                    "none";
                }}
              >
                Save changes
              </button>
        <button type="button"  class="btn btn-secondary" data-bs-dismiss="modal" fdprocessedid="zpmtb" 
                 
               >Close</button>
      </div>
    </div>
  </div>
</div>
{/* onClick={() => {
                  setTodoDesc(initialDesc); // Reset the description on close
                  closeModal(); // Close the modal without saving
                }}  */}
            {/* End Modal */}
        </>
    );
}
export default EditTodo;