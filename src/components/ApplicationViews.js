import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import RegisterForm from "./authentication/login"

import ClientManager from "../modules/clientManager";
import ClientList from "./clients/clientList";
import ClientForm from "./clients/clientForm";
import Client from "./clients/client";
import ClientEdit from "./clients/clientEdit";

import NoteManager from "../modules/notesManager";
import NoteDetail from "./notes/noteDetail";
import NoteForm from "./notes/noteForm";
import NoteEdit from "./notes/noteEdit"

import EnvironmentManager from "../modules/environmentManager"
import TherapyManager from "../modules/therapyManager"

import Auth0Client from "./authentication/Auth";
import Callback from "./authentication/Callback";



class ApplicationViews extends Component {


    state = {
        clients: [],
        notes: [],
        environment: [],
        therapy: []
    };

    // ///////////////////////////////////////////////////////////
    ////// authenticate and get credentialed storage /////////////
    //////////////do i need this?????/////////////////////////////

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
    updateClient = editedClientObject => {
        return ClientManager.put(editedClientObject)
            .then(() => ClientManager.getAll())
            .then(clients => {
                this.setState({
                    clients: clients
                })
            });
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
    updateNote = editedNoteObject => {
        return NoteManager.put(editedNoteObject)
            .then(() => NoteManager.getAll())
            .then(notes => {
                this.setState({
                    notes: notes
                })
            });
    };

    /////////////////////////////////////////////////////////////
    /////////////////// API CALL FOR DATA ///////////////////////
    /////////////////////////////////////////////////////////////

    componentDidMount() {
        const newState = {}

        ClientManager.getAll()
            .then(clients => (newState.clients = clients))
            .then(NoteManager.getAll)
            .then(notes => (newState.notes = notes))
            .then(EnvironmentManager.getAll)
            .then(environment => (newState.environment = environment))
            .then(TherapyManager.getAll)
            .then(therapy => (newState.therapy =therapy))
            .then(() => this.setState(newState))

    }

    /////////////////////////////////////////////////////////////
    ///////////// ROUTES (AUTHENTICATION&LOGIN) /////////////////
    /////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="navBeast">

                <Route exact path="/callback" component={Callback} />
                <Route
                    exact path="/register"
                    render={props => {
                        return (
                            <RegisterForm
                                {...props}
                                addUser={this.addUser}
                                registerUser={this.registerUser}
                                refreshUsers={this.refreshUsers}
                            />
                        );
                    }}
                />

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

                {/* /////////////////////////////////////////////////////////
    ////////////////////// ROUTES (CLIENTS) /////////////////////
    ///////////////////////////////////////////////////////////// */}
                <Route
                    exact
                    path="/clients"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <ClientList
                                {...props}
                                clients={this.state.clients}
                                deleteClient={this.deleteClient}
                            />
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
                                environment={this.state.environment}
                                therapy={this.state.therapy}
                            />
                        ) : (
                                <Redirect to="/login" />
                            )
                    }}
                />
                <Route
                    path="/clients/:clientId(\d+)/edit"
                    render={props => {
                        return <ClientEdit
                            {...props}
                            clients={this.state.clients}
                            updateClient={this.updateClient}
                        />
                    }}
                />

                {/* /////////////////////////////////////////////////////////////
    /////////////////// ROUTES (NOTES) //////////////////////////
    ///////////////////////////////////////////////////////////// */}
                <Route
                    exact path="/notes/:noteId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <NoteDetail
                                {...props}
                                deleteNote={this.deleteNote}
                                notes={this.state.notes}
                                therapy={this.state.therapy}
                                environment={this.state.environment}
                                updateNote={this.updateNote}
                            />
                        ) : (
                                <Redirect tp="/login" />
                            )
                    }}
                />
                <Route
                    exact path="/notes/new/:clientId(\d+)"
                    render={(props) => {
                        return this.isAuthenticated() ? (
                            <NoteForm {...props}
                                addNote={this.addNote}
                                notes={this.state.notes}
                                therapy={this.state.therapy}
                                environment={this.state.environment}
                            />
                        ) : (
                                <Redirect to="/login" />
                            )
                    }} />
                     <Route
                    path="/notes/:noteId(\d+)/edit"
                    render={props => {
                        return <NoteEdit
                            {...props}
                            notes={this.state.notes}
                            updateNote={this.updateNote}
                            clients={this.state.clients}
                            therapy={this.state.therapy}
                            environment={this.state.environment}
                        />
                    }}
                />

            </div>
        )
    }
}
export default ApplicationViews