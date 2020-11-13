import React, { Component } from 'react';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log(children)
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}        
          {/* <button className="nav-link" onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };