import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

import ClientManager from "../modules/clientManager";
import ClientList from "./clients/clientList";

import NoteManager from "../modules/notesManager";

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


    componentDidMount() {
        const newState = {}

        ClientManager.getAll()
            .then(clients => (newState.clients = clients))
            .then(NoteManager.getAll)
            .then(documents => (newState.documents = documents))
            .then(() => this.setState(newState));
    }

    render() {
        return (
            <div className="navBeast">
                <Route
                    exact
                    path="/"
                    render={props => {
                        if (Auth0Client.isAuthenticated()) {
                            return <ClientList clients={this.state.clients} />;
                        } else {
                            Auth0Client.signIn()
                            return null;
                        }
                    }}
                />
                <Route exact path="/callback" component={Callback} />
                <Route
                    exact
                    path="/clients"
                    render={props => {
                        if (Auth0Client.isAuthenticated()) {
                            return <ClientList {...props} clients={this.state.clients} />;
                        } else {
                            Auth0Client.signIn();
                            return null;
                        }
                    }}
                />


            </div>
        )
    }
}
export default ApplicationViews