import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

import "./Formulatron.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import auth0Client from "./authentication/Auth"
import {withRouter} from 'react-router-dom';

class Formulatron extends Component {
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') return;
        try {
          await auth0Client.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
      }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default withRouter(Formulatron);