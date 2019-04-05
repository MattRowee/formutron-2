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

      ///how to grab these values?
      environmentId: sessionStorage.getItem("credentials"),
      therapyId: sessionStorage.getItem("credentials"),
      clientId: parseInt(this.props.match.params.clientId)
    };

    // Create the animal and redirect user to animal list
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
              checked={true}
              className="form-control"
              id="accompanied"
            />
          </div>

          <form className="environmentForm">
            <div className="environmentDiv">
              <label>
                <input
                  type="radio"
                  name="environmentRadio"
                  value="school"
                  className="form-check-input"
                />
                School
              </label>
            </div>
            <div className="environmentDiv">
              <label>
                <input
                  type="radio"
                  name="environmentRadio"
                  value="home"
                  className="form-check-input"
                />
                Home
              </label>
            </div>
            <div className="environmentDiv">
              <label>
                <input
                  type="radio"
                  name="environmentRadio"
                  value="clinic"
                  className="form-check-input"
                />
                Clinic
              </label>
            </div>
          </form>

          <form className="therapyForm">
            <div className="therapyDiv">
              <label>
                <input
                  type="radio"
                  name="therapyRadio"
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
