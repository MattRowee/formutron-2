import React, { Component } from "react"
import ClientManager from "../../modules/clientManager"

// setting state.. what does that really mean? defining the keys of the object?
export default class AnimalEditForm extends Component {
    // Set initial state
    state = {
        clientName: "",
        age: "",
        phoneNumber: "",
        address: "",
        email: "",
        history: "",
        employeeId: ""
      };

// this is a function that changes the state of the target, setting it to the target value.
// a neccessary function for editing. See if you can find this function in other modules on the app.
// it is called after the method [[onChange]] further down in the render function
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
// updateExistingAnimal is all the crap that runs when you update your animal.
// Prevent default prevents the function from running... you don't really understand it's functionality
// if the inputs are all filled in, creates edited animal and runs the update animal function with
// the edited animal object
    updateExistingClient = evt => {
      evt.preventDefault()


        const editedClient = {
          id: this.props.match.params.clientId,
          name: this.state.clientName,
          age: this.state.age,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          email: this.state.email,
          history: this.state.history,
          userId: sessionStorage.getItem("credentials")
        };

    this.props
    .updateClient(editedClient)
    .then(() => this.props.history.push("/clients"))
    }

// when the component mounts, grab the matching client data from the database and setstate with that info
    componentDidMount() {
      ClientManager.getClient(this.props.match.params.clientId)
      .then(client => {
        this.setState({
          clientName: client.name,
          age: client.age,
          phoneNumber: client.phoneNumber,
          address: client.address,
          email: client.email,
          history: client.history,
          employeeId: client.employeeId
        });
      });
    }

// actual generation/rendering of the edit form
    render() {
      return (
        <React.Fragment>
          <form className="clientForm">
            <div className="form-group">
              <label htmlFor="clientName">Client name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="clientName"
                value = {this.state.clientName}
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
              value={this.state.age}
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
              value={this.state.phoneNumber}
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
              value={this.state.address}
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
              value={this.state.email}
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
              value={this.state.history}
            />
          </div>
            <button
              type="submit"
              onClick={this.updateExistingClient}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}