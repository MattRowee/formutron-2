import React, { Component } from "react";
import UserManager from "../../modules/userManager";
export default class Login extends Component {
  // Set initial state.
  state = {

    email: "",
    password: "",
    rememberMe: false,
    errorMessage: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    // If the input was a checkbox, we want to store a boolean in state so the syntax is a lil bit different
    if (evt.target.type === "checkbox") {
      stateToChange[evt.target.id] = evt.target.checked;
    } else {
      stateToChange[evt.target.id] = evt.target.value;
    }
    this.setState(stateToChange);
  };

  handleLogin = e => {
    e.preventDefault();

    // When the user logs in, search the database for their email address to bring up the rest of their info (password, etc)
    UserManager.getByEmail(this.state.email).then(user => {
      let errorMessage = "";
      if (user.length === 0) {
        // If nothing comes back from the db, that user doesn't exist yet and we should tell them that they should create an account
        errorMessage =
          "We couldn't find that email address in our records. Would you like to create an account?";
        this.setState({ errorMessage: errorMessage });
      } else {
          // If their passwords match, go ahead and put their id in storage
        if (user[0].password === this.state.password) {
          this.state.remeberMe
            ? localStorage.setItem(
                "credentials",
                JSON.stringify(user[0].id)
              )
            : sessionStorage.setItem(
                "credentials",
                JSON.stringify(user[0].id)
              );
          this.props.history.push("/");
        } else {
            // if their passwords don't match, throw an error message
          errorMessage = "Your password was incorrect. Please try again.";
          this.setState({ errorMessage: errorMessage });
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail">Email address</label>
          <input
            onChange={this.handleFieldChange}
            type="email"
            id="email"
            placeholder="Email address"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            required=""
          />
          <label htmlFor="rememberMe">Remember me?</label>
          <input
            type="checkbox"
            onChange={this.handleFieldChange}
            id="rememberMe"
          />
          <button className="btn btn-success" type="submit">
            Sign in
          </button>
        </form>
        <h4>{this.state.errorMessage}</h4>
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={() => this.props.history.push("/register")}
        >
          Create an Account
        </button>
      </React.Fragment>
    );
  }
}