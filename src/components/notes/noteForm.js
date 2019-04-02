import React, { Component } from "react";


export default class NoteForm extends Component {
  // Set initial state when ClientForm renders.
  state = {
    date: "",
    maladaptivePattern: "",
    symptoms: "",
    copingSkills: "",
    accompanied: false,
    environmentId: "",
    therapyId: "",
    clientId: ""
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
  constructNewNote = evt => {
    evt.preventDefault();
      const note = {
        date: this.state.date,
        maladaptivePattern: this.state.maladaptivePattern,
        symptoms: this.state.symptoms,
        copingSkills: this.state.copingSkills,
        accompanied: this.state.accompanied,
        environmentId: parseInt(this.state.environmentId),
        therapyId: parseInt(this.state.therapyId),
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        clientId: parseInt(this.state.employeeId)
      };

      // Create the animal and redirect user to animal list
      this.props
        .addNote(note)
        .then(() => this.props.history.push("/notes"));
  };

  render() {
    return (
      <React.Fragment>
        <form className="NoteForm">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              placeholder="Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maladaptivePattern">Maladaptive Pattern</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="maladaptivePattern"
              placeholder="Maladaptive Pattern"
            />
          </div>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="symptoms"
              placeholder="Symptoms"
            />
          </div>
          <div className="form-group">
            <label htmlFor="copingSkills">Coping Skills</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="copingSkills"
              placeholder="Coping Skills"
            />
          </div>
          <div className="form-group">
            <label htmlFor="accompanied">Accompanied</label>
            <input
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="accompanied"
              placeholder="Accompanied"
            />
          </div>
          {/* we still dont have ENVIRONMENT and THERAPY fields */}
          <button
            type="submit"
            onClick={this.constructNewClient}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

// Using the Form
// Once you've got all these pieces in place, click on the Admit Client button, fill out the form, and submit it. You should immediately see your new animal in the list.
