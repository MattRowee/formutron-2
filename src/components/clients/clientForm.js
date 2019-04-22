import React, { Component } from "react";


export default class ClientForm extends Component {
  // Set initial state when ClientForm renders.
  state = {
    clientName: "",
    age: "",
    phoneNumber: "",
    address: "",
    email: "",
    history: "",
    userId: ""
  };


  // Update state whenever an input field is edited
  handleFieldChange = evt => {
      console.log("This is evt", evt);
      console.log("This is evt.target.value", evt.target.value);
      console.log("this is evt.target.id", evt.target.id)
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewClient = evt => {
    evt.preventDefault();

      const client = {
        name: this.state.clientName,
        age: this.state.age,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        email: this.state.email,
        history: this.state.history,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        userId: sessionStorage.getItem("credentials")
      };

      // set item on the clientId to retrieve later in note form
      // this.props.then(this.id.sessionStorage.setItem("client-credentials"),

      // Create the client and redirect user to animal list
      this.props
        .addClient(client)
        .then(() => this.props.history.push("/clients"))

  };




  render() {
    return (
      <React.Fragment>
        <form className="ClientForm">
          <div className="form-group">
            <label htmlFor="ClientName">Client Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="clientName"
              placeholder="Client name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="age"
              placeholder="age"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="phoneNumber"
              placeholder="phoneNumber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Address</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              placeholder="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">History</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="history"
              placeholder="history"
            />
          </div>
          <div className="clientButton">
          <button
            type="submit"
            onClick={this.constructNewClient}
            className="btn btn-primary"
          >
            Submit
          </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

// Using the Form
// Once you've got all these pieces in place, click on the Admit Client button, fill out the form, and submit it. You should immediately see your new animal in the list.

