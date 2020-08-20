import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class EmployeeCard extends Component {
    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={this.props.resource.image} className="" />
                        <h4 className="clientCardName">{this.props.resource.name}</h4>
                        <h6 className="clientCardEmail">{this.props.resource.email}</h6>                       
                            <Link className="nav-link" to={`/${this.props.route}/${this.props.resource.id}`}>Transfer a Client</Link>                      
                    </h5>
                </div>
            </div>);
    }
}
