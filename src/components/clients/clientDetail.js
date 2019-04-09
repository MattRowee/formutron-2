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
                <div key={client.id} className="card">
                    <div className="card-body">
                        <h6 className="card-title">Name:
                            {client.name}
                        </h6>
                        <h6 className="card-title">Age: {client.age}</h6>
                        <h6 className="card-title">Phone number: {client.phoneNumber}</h6>
                        <h6 className="card-title">Address: {client.address}</h6>
                        <h6 className="card-title">E-mail: {client.email}</h6>
                        <h6 className="card-title">History: {client.history}</h6>
                        {/* an anchor tag which calls the delete function
                        then pushes the user to the animals route as a reset */}

                        <a href="#"
                            onClick={() => this.props.deleteClient(client.id)
                                .then(() => this.props.history.push("/"))}
                            className="card-link">Delete</a>

                            {/* This button has a click event that pushes
                            the user to the edit route */}
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/clients/${client.id}/edit`);
                            }}
                        >
                            Edit
                        </button>
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

