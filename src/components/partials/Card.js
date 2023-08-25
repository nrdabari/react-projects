import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// src/partials/Card.js


const Card = ({ id, todo, description, status, useremail, onDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{todo}</h3>
          <hr/>
          <p className="card-text">{description}</p>
          <p className={`card-text ${status === "completed" ? "text-warning" : ""}`}>
            Status: {status}
          </p>
          <p className="card-text">User: {useremail}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mx-3">
              <FaEdit />
            </button>
            <button className="btn btn-warning" onClick={onDelete}>
              <FaTrash /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;







// function Card(){
//     return(
        
//         // <div className="col-sm-3 mx-3 my-2 card text-white bg-success">
//         //     <div className="card-body">
//         //                 <h4 class="card-title text-center">Todo</h4>
//         //                 <hr />
//         //     </div>
//         // </div>
//         <div className="col-lg-4">
//         <div className="bs-component">
//         <div className="card text-white bg-success mb-3" style={{ maxWidth: "20rem" }}>
//   <div className="card-header " >Header</div>
//   <div className="card-body">
//     <h4 className="card-title">Success card title</h4>
//     <p className="card-text">
//       Some quick example text to build on the card title and make up the bulk of
//       the card's content.
//     </p>
//   </div>
// </div>
// </div>
// </div>
//     );
// }
// export default Card;