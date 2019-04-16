import React, { Component } from "react";
import PropTypes from 'prop-types'

export default class NoteForm extends Component {
  // Set initial state when NoteForm renders.
  state = {
    date: "",
    maladaptivePattern: "",
    symptoms: "",
    copingSkills: "",
    accompanied: "",
    environmentId: "",
    therapyId: "",
    clientId: "",
    environment: "",
    therapy: ""
  };


  // Update state whenever an input field is edited
  handleFieldChange = evt => {

    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(evt.target)
  };

  // create a const to initialize environment?
  /*
        Local method for validation, creating note object, and
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

      ///how to grab these values? RADIO BUTTONS NEED A [HANDLE FIELD CHANGE]
      environmentId: parseInt(this.state.environmentId),
      therapyId: parseInt(this.state.therapyId),
      clientId: parseInt(this.props.match.params.clientId)
    };
    if (note.accompanied === "true") { note.accompanied = true }
    else (note.accompanied = false)
    // Create the note and redirect user to client list
    this.props
      .addNote(note)
      .then(() => this.props.history.push("/"))
    console.log(this.props)
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
              className="form-control"
              onChange={this.handleFieldChange}
              value={true}
              id="accompanied"
            />
          </div>

          {/* ///////////////////////////////////////////////////////////////
    //////////////////////// environment form  ////////////////
    /////////////////////////////////////////////////////////////// */}
          <form className="environmentForm">
            <label>Environment</label>
            {this.props.environment.map(environments => {

              return <div key={environments.id} className="environmentDiv">
                <label htmlFor="environment">
                  <input
                    id="environmentId"
                    type="radio"
                    name="environmentRadio"
                    value={environments.id}
                    onChange={this.handleFieldChange}
                    className="environmentInput"
                  />
                  {environments.name}
                </label>
              </div>
            }
            )}
          </form>

          {/* ///////////////////////////////////////////////////////////////
    //////////// therapy form section of note form ////////////////
    /////////////////////////////////////////////////////////////// */}

          <form className="therapyForm">
            <label>Focus of Therapy</label>
            {this.props.therapy.map(therapies => {

              return <div key={therapies.id} className="therapyDiv">
                <label htmlFor="therapy">
                  <input
                    id="therapyId"
                    type="radio"
                    name="therapyRadio"
                    value={therapies.id}
                    onChange={this.handleFieldChange}
                    className="therapyInput"
                  />
                  {therapies.name}
                </label>
              </div>
            }
            )}
          </form>

          <button
            type="submit"
            onClick={this.constructNewNote}
            className="btn btn-primary"
          >
            Submit
          </button>

        </form>
      </React.Fragment>
    );
  }
}

NoteForm.propTypes = {
  environment: PropTypes.arrayOf(PropTypes.object)
}