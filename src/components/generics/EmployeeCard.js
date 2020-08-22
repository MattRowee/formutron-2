import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'

// function Example() {
//     // const [show, setShow] = useState(false);
  
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     return (
//         <>
//           {/* <Button variant="primary" onClick={handleShow}>
//             Launch demo modal
//           </Button> */}
    
//           <Modal show={show} onHide={handleClose}>
//             {/* <Modal.Header>
//               <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header> */}
//             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//             {/* <Modal.Footer>
             
//             </Modal.Footer> */}
//           </Modal>
//         </>
//       );
//     }
function TransferClient(){
    console.log("are we getting anywhere?")
}

export default class EmployeeCard extends Component {
    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={this.props.resource.image} className="" />
                        <h4 className="clientCardName">{this.props.resource.name}</h4>
                        <h6 className="clientCardEmail">{this.props.resource.email}</h6>                       
                            <button className="nav-link"  onClick={TransferClient} >Transfer a Client</button>                      
                    </h5>
                </div>
            </div>);
    }
}
