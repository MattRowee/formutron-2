import React, { Component } from "react";
import userManager from "../../modules/userManager";

export default class EmployeeForm extends Component {
  // Set initial state when animalForms renders.
  state = {
    name: "",
    employeeId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: ""

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
  constructNewEmployee = evt => {
    evt.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      const errorMessage ="Your passwords didn't match. Please try harder.";
      this.setState({ errorMessage: errorMessage});
      return null;
      // returning null just bumps us out of the function so the rest of it doesnt' run.
    }

      const employeeToPost = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.



     userManager.getByEmail(this.state.email).then(employee => {
       if(employee.length > 0) {console.log(employee)
         const errorMessage =
         "We're sorry, that email already exists. Would you like to log in instead?";
         this.setState({errorMessage: errorMessage});
       } else {
         this.props.registerEmployee(employeeToPost).then(employee => {console.log(employee);
        sessionStorage.setItem("credentials", JSON.stringify(employee.id));
        this.props.history.push("/");
        this.props.refreshEmployees(); //this function is in our ApplicationViews component
        });
       }
     });
    };

  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              className="form-control"
              onChange={this.handleFieldChange}
            />
          </div>
          <h4>{this.state.errorMessage}</h4>
          <button
            type="submit"
            onClick={this.constructNewEmployee}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}