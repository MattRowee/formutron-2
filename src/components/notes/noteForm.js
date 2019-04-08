import React, { Component } from "react";
// import EnvironmentManager from "../modules/environmentManager"
// import TherapyManager from "../modules/therapyManager"
import PropTypes from 'prop-types'

export default class NoteForm extends Component {
  // Set initial state when ClientForm renders.
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
    console.log("This is evt", evt);
    console.log("This is evt.target.value", evt.target.value);
    console.log("this is evt.target.id", evt.target.id)
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
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
      environmentId: this.state.environment,
      therapyId: "",
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

    console.log(this.props.environment)
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
          {this.props.environment.map(environments =>

              <div key={environments.id} className="environmentDiv">
                <label htmlFor="environment">
                  <input
                    type="radio"
                    name="environmentRadio"
                    value={environments.id}
                    onChange={this.handleFieldChange}
                    className="form-check-input"
                  />
                  {environments.name}
                </label>
              </div>

          )}
 </form>



          {/* ///////////////////////////////////////////////////////////////
    //////////// therapy form section of note form ////////////////
    /////////////////////////////////////////////////////////////// */}

          <form className="therapyForm">
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  checked={true}
                  value="sensoryIntegration"
                  className="form-check-input"
                />
                Sensory Integration
              </label>
            </div>
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  value="oral"
                  className="form-check-input"
                />
                Feeding / Oral-motor
              </label>
            </div>
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  value="speech"
                  className="form-check-input"
                />
                Speech / Articulation
              </label>
            </div>
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  value="expression"
                  className="form-check-input"
                />
                Expression / Receptive Language
              </label>
            </div>
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  value="pragmatic"
                  className="form-check-input"
                />
                Pragmatic / Social
              </label>
            </div>
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
                  value="collaboration"
                  className="form-check-input"
                />
                Education / Training / Collaboration
              </label>
            </div>
          </form>



          {/* we still dont have ENVIRONMENT and THERAPY fields */}
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

// Using the Form
// Once you've got all these pieces in place, click on the Admit Client button, fill out the form, and submit it. You should immediately see your new animal in the list.
NoteForm.propTypes = {
  environment: PropTypes.arrayOf(PropTypes.object)
}