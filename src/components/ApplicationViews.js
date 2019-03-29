import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"

class ApplicationViews extends Component {


    state = {
        clients: [],
        documents: []
    };

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;


        componentDidMount() {
            const newState = {}

            ClientManager.getAll()
                .then(clients => (newState.clients = clients))
                .then(DocumentManager.getAll)
                .then(documents => (newState.documents = documents))
                .then(() => this.setState(newState));
        }

        render() {
        return (
            <div className="navBeast">
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

                <Route
                    path="/login"
                    render={props => {
                        return <Login {...props} />
                    }} />
                <Route exact path="/callback" component={Callback} />

            </div>
        )
    }}
    export default ApplicationViews