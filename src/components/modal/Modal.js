import React, { useEffect, useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Calculator from "./Calculator";
import Order from "./Order";

function Modal({ showModal, setShowModal, onModal}) {


  return (
    <div
      className="modal"
      tabIndex={-1}
      role="dialog"
      style={{ display: showModal }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Калькулятор вікон</h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => onModal()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>


        
          <Routes>
           
            <Route path="/order" element={<Order showModal={showModal} setShowModal={setShowModal} ></Order>} />
            <Route path="/calc" element={<Calculator onModal={onModal} />} />
          </Routes>

         
        </div>
      </div>
    </div>
  );
}

export default Modal;
