import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import { render } from 'react-dom';
import ClientManager from "../../modules/clientManager";


export default class EmployeeCard extends Component {
    state = { 
        show: false, 
        clients: []
    };
    componentDidMount() {
        const newState = {}

        ClientManager.getAll()
            .then(clients => (newState.clients = clients))
            .then(() => this.setState(newState))
    };


  showModal = () => {
    this.setState({ show: true });
    // console.log(this.state);
  };

  hideModal = () => {
    this.setState({ show: false });
  };

    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title"></h5>
                        <img src={this.props.resource.image} className="" />
                        <h4 className="clientCardName">{this.props.resource.name}</h4>
                        <h6 className="clientCardEmail">{this.props.resource.email}</h6>                       
                            <button className="nav-link"  onClick={this.showModal} >Transfer a Client</button>    
                            {/*  Build out this modal to print out Client info and Edit Clients userId */}
                    
                    <Modal show={this.state.show}>
                        <p>Which client would you like to transfer?</p>
                        {this.state.clients.map(singleClient => {
                                console.log(singleClient, this.props.resource.id);
                                 if(singleClient.userId === parseInt(this.props.resource.id))
                                 // sessionStorage.getItem('credentials')
                                 {
                                    console.log(singleClient.name);
                            //    return  <p>{singleClient.name}</p>
                                }
                        })}
                        <button className='nav-button' onClick={this.hideModal}>Hello World</button>
                    </Modal>
                </div>
            </div>);
    }
}
// handleClose={this.props.hideModal}
