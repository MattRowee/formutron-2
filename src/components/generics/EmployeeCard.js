import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import { render } from 'react-dom';


// function TransferClient(){
//     console.log("are we getting anywhere?");
    
// return(

//     <Modal>
//             {/* <Modal.Header>
//               <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header> */}
//             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//             {/* <Modal.Footer>
             
//             </Modal.Footer> */}
//           </Modal>
// )
    
// }

export default class EmployeeCard extends Component {
    state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={this.props.resource.image} className="" />
                        <h4 className="clientCardName">{this.props.resource.name}</h4>
                        <h6 className="clientCardEmail">{this.props.resource.email}</h6>                       
                            <button className="nav-link"  onClick={this.showModal} >Transfer a Client</button>                      
                    </h5>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p>Modal</p>
                        <p>Data</p>
                    </Modal>
                </div>
            </div>);
    }
}
