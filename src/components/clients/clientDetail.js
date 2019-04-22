import React, { Component } from 'react';
import PropTypes from 'prop-types'
export default class ClientDetail extends Component {
    render() {
        /*
            Using the route parameter, find the client that the
            user clicked on by looking at the `this.props.clients`
            collection that was passed down from ApplicationViews
        */

        // this finds the corresponding client (to the card you clicked on)
        // and pops up the corresponging detail card
        const client = this.props.clients.find(a => a.id ===
            parseInt(this.props.match.params.clientId)) || {}

        return (
            <section className="clients">
                <div key={client.id} className="clientCard">
                    <div className="card-body">
                        <h5 className="card-title">Name:
                           <h6> {client.name}</h6>
                        </h5>
                        <h5 className="card-title">Age: <h6>{client.age}</h6></h5>
                        <h5 className="card-title">Phone number: <h6>{client.phoneNumber}</h6></h5>
                        <h5 className="card-title">Address: <h6>{client.address}</h6></h5>
                        <h5 className="card-title">E-mail: <h6>{client.email}</h6></h5>
                        <h5 className="card-title">History:<h6> {client.history}</h6></h5>
                        {/* an anchor tag which calls the delete function
                        then pushes the user to the animals route as a reset */}
                        <div className="ButtonBox">
                            <div className="clientButton">
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => this.props.deleteClient(client.id)
                                        .then(() => this.props.history.push("/"))}
                                >Delete</button>
                            </div>

                            {/* This button has a click event that pushes
                            the user to the edit route */}
                            <div className="clientButton">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => {
                                        this.props.history.push(`/clients/${client.id}/edit`);
                                    }}
                                >
                                    Edit
                        </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

ClientDetail.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.object),
    deleteClient: PropTypes.object
}

