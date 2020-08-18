import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./nav/NavBar"

import Login from './authentication/login';
import UserManager from '../modules/userManager.js';
import EmployeeForm from "./employees/employeeForm.js";
import EmployeeList from "./employees/employeeList";

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

import Callback from "./authentication/Callback";



class ApplicationViews extends Component {


    state = {
        clients: [],
        notes: [],
        environment: [],
        therapy: [],
        employees: []
    };

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;

    // ///////////////////////////////////////////////////////////
    ////////////// API FUNCTIONS FOR USERS/EMPLOYEES /////////////
    /////////////////////////////////////////////////////////////

    registerEmployee = employeeObject =>
        UserManager.postUser(employeeObject);

    refreshEmployees = () =>
        UserManager.getAll().then(parsedEmps => {
            this.setState({ employees: parsedEmps });
        });

    deleteEmployee = id => {
        return UserManager.deleteUser(id).then(employees =>
            this.setState({
                employees: employees
            })
        );
    };
    addEmployee = employeeObject =>
        UserManager.postUser(employeeObject)
            .then(() => UserManager.getAll())
            .then(employees =>
                this.setState({
                    employees: employees
                })
            );

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
            .then(therapy => (newState.therapy = therapy))
            .then(UserManager.getAll)
            .then(employees =>(newState.employees = employees))
            .then(() => this.setState(newState))

    }

    /////////////////////////////////////////////////////////////
    ///////////// ROUTES (AUTHENTICATION&LOGIN) /////////////////
    /////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="navBeast">
                {/* <Route exact path="/callback" component={Callback} /> */}
                <Route
                    exact path="/login"

                    render={props => {
                        return <Login {...props} />
                    }} />


                <Route
                    exact
                    path="/"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return (
                                <React.Fragment>
                                    <NavBar />
                                    <ClientList {...props} clients={this.state.clients} />;
                                </React.Fragment>
                            )
                        } else {
                            return <Redirect to="/login" />;
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
                            <React.Fragment>
                                <NavBar />
                                <ClientList
                                    {...props}
                                    clients={this.state.clients}
                                    deleteClient={this.deleteClient}
                                />
                            </React.Fragment>
                        )
                            : (
                                <Redirect to="/login" />
                            );
                    }}
                />

                <Route
                    exact path="/clients/new"
                    render={(props) => {
                        return this.isAuthenticated() ? (
                            <React.Fragment>
                                <NavBar />
                                <ClientForm {...props}
                                    addClient={this.addClient}
                                    clients={this.state.clients} />
                            </React.Fragment>
                        )
                            : (
                                <Redirect to="/login" />
                            )
                    }} />

                <Route
                    exact path="/clients/:clientId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <React.Fragment>
                                <NavBar />
                                <Client
                                    {...props}
                                    deleteClient={this.deleteClient}
                                    clients={this.state.clients}
                                    addNote={this.addNote}
                                    notes={this.state.notes}
                                    environment={this.state.environment}
                                    therapy={this.state.therapy}
                                />
                            </React.Fragment>
                        ) : (
                                <Redirect to="/login" />
                            )
                    }}
                />
                <Route
                    path="/clients/:clientId(\d+)/edit"
                    render={props => {
                        return  (
                            <React.Fragment>
                                <NavBar />
                                <ClientEdit
                                    {...props}
                                    clients={this.state.clients}
                                    updateClient={this.updateClient}
                                />
                            </React.Fragment>
                        )
                    }}
                />

                {/* /////////////////////////////////////////////////////////////
    /////////////////// ROUTES (NOTES) //////////////////////////
    ///////////////////////////////////////////////////////////// */}
                <Route
                    exact path="/notes/:noteId(\d+)"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <React.Fragment>
                                <NavBar />
                                <NoteDetail
                                    {...props}
                                    deleteNote={this.deleteNote}
                                    notes={this.state.notes}
                                    therapy={this.state.therapy}
                                    environment={this.state.environment}
                                    updateNote={this.updateNote}
                                />
                            </React.Fragment>
                        ) : (
                                <Redirect tp="/login" />
                            )
                    }}
                />
                <Route
                    exact path="/notes/new/:clientId(\d+)"
                    render={(props) => {
                        return this.isAuthenticated() ? (

                            <React.Fragment>
                                <NavBar />
                                <NoteForm {...props}
                                    addNote={this.addNote}
                                    notes={this.state.notes}
                                    therapy={this.state.therapy}
                                    environment={this.state.environment}
                                />
                            </React.Fragment>
                        ) : (
                                <Redirect to="/login" />
                            )
                    }} />
                <Route
                    path="/notes/:noteId(\d+)/edit"
                    render={props => {
                        return(
                            <React.Fragment>
                                <NavBar />
                                <NoteEdit
                                    {...props}
                                    notes={this.state.notes}
                                    updateNote={this.updateNote}
                                    clients={this.state.clients}
                                    therapy={this.state.therapy}
                                    environment={this.state.environment}
                                />
                            </React.Fragment>
                        )
                    }}
                />

                {/* /////////////////////////////////////////////////////////////
    /////////////////// ROUTES (NEW USERS/EMPLOYEES) //////////////////////////
    ///////////////////////////////////////////////////////////// */}

                <Route
                    exact path="/register"
                    render={props => {
                        return (
                            <React.Fragment>
                                <NavBar />
                                <EmployeeForm
                                    {...props}
                                    addEmployee={this.addEmployee}
                                    registerEmployee={this.registerEmployee}
                                    refreshEmployees={this.refreshEmployees}
                                />
                            </React.Fragment>
                        );
                    }}
                />
                <Route
                    exact path="/employees"
                    render={props => {
                        return (
                            <React.Fragment>
                                <NavBar />
                                <EmployeeList
                                    {...props}
                                    employees={this.state.employees}
                                />
                            </React.Fragment>
                        );
                    }}
                />

            </div>
        )
    }
}
export default ApplicationViews