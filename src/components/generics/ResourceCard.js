import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class ResourceCard extends Component {
    render() {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={this.props.resource.image} className="" />
                        <h4 className="clientCardName">{this.props.resource.name}</h4>
                        <h6 className="clientCardEmail">{this.props.resource.email}</h6>
                        <h4 className="noteCardDate">{this.props.resource.date}</h4>
                        <h6 className="noteCardSkill">{this.props.resource.copingSkills}</h6>

                        <Link className="nav-link" to={`/${this.props.route}/${this.props.resource.id}`}>Details</Link>
                    </h5>
                </div>
            </div>);
    }
}
