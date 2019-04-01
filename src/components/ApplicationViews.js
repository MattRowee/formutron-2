import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

import ClientManager from "../modules/clientManager";
import ClientList from "./clients/clientList";
import ClientForm from "./clients/clientForm";
import ClientDetail from "./clients/clientDetail";
import Client from "./clients/client"

import NoteManager from "../modules/notesManager";
import NoteList from "./notes/noteList"

import Auth0Client from "./authentication/Auth";
import Callback from "./authentication/Callback";


class ApplicationViews extends Component {


    state = {
        clients: [],
        notes: [],
        environment: [],
        therapy: []
    };

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;


    // ///////////////////////////////////////////////////////////
    ////////////// API FUNCTIONS FOR CLIENTS ///////////////////////
    /////////////////////////////////////////////////////////////

    addClient = clientObject =>
        ClientManager.postClient(clientObject)
            .then(() => ClientManager.getAll())
            .then(clients =>
                this.setState({
                    clients: clients
                })
            );
    deleteClient = id => {
        return ClientManager.deleteClient(id).then(clients =>
            this.setState({
                clients: clients
            })
        );
    };

    ///////////////////////////////////////////////////////////
    ////////////// API FUNCTIONS FOR NOTES ///////////////////////
    /////////////////////////////////////////////////////////////

    addNote = noteObject =>
        NoteManager.postNote(noteObject)
            .then(() => NoteManager.getAll())
            .then(notes =>
                this.setState({
                    notes: notes
                })
            );
    deleteNote = id => {
        return NoteManager.deleteNote(id).then(notes =>
            this.setState({
                notes: notes
            })
        );
    };

    componentDidMount() {
        const newState = {}

        ClientManager.getAll()
            .then(clients => (newState.clients = clients))
            .then(NoteManager.getAll)
            .then(notes => (newState.notes = notes))
            .then(() => this.setState(newState));
    }

    render() {
        return (
            <div className="navBeast">
                <Route exact path="/callback" component={Callback} />
                <Route
                    exact
                    path="/"
                    render={props => {
                        if (Auth0Client.isAuthenticated()) {
                            return <ClientList {...props} clients={this.state.clients} />;
                        } else {
                            Auth0Client.signIn()
                            return null;
                        }
                    }}
                />
                <Route
                    exact
                    path="/clients"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <ClientList {...props} clients={this.state.clients} />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />

                <Route
                    exact path="/clients/new"
                    render={(props) => {
                        return this.isAuthenticated() ? (
                            <ClientForm {...props}
                                addClient={this.addClient}
                                clients={this.state.clients} />
                        ) : (
                                <Redirect to="/login" />
                            )
                    }} />
                {/* <Route
                    exact path="/clients/:clientId(\d+)"
                    render={(props) => {
                        return this.isAuthenticated() ? (
                            <ClientDetail {...props}
                                deleteClient={this.deleteClient}
                                clients={this.state.clients} />
                            // <NoteList {...props}
                            //     addNote={this.addNote}
                            //     // clients={this.state.clients}
                            //     notes={this.state.notes} />
                        ) : (
                                <Redirect to="/login" />
                            )
                    }} /> */}
                <Route
                    exact path="/clients/:clientId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <Client
                                {...props}
                                deleteClient={this.deleteClient}
                                clients={this.state.clients}
                                addNote={this.addNote}
                                notes={this.state.notes}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }}
                />


            </div>
        )
    }
}
export default ApplicationViews