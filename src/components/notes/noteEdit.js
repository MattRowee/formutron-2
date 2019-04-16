import React, { Component } from "react"
import NoteManager from "../../modules/notesManager"

// setting state.. what does that really mean? defining the keys of the object?
export default class NoteEditForm extends Component {
    // Set initial state
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

// this is a function that changes the state of the target, setting it to the target value.
// a neccessary function for editing. See if you can find this function in other modules on the app.
// it is called after the method [[onChange]] further down in the render function
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
// updateExistingNote is all the code that runs when you update your note.
// Prevent default prevents the function from running...
// if the inputs are all filled in, creates edited note and runs the update note function with
// the edited note object
    updateExistingNote = evt => {
      evt.preventDefault()

        const editedNote = {
            id: this.props.match.params.noteId,
            date: this.state.date,
            maladaptivePattern: this.state.maladaptivePattern,
            symptoms: this.state.symptoms,
            copingSkills: this.state.copingSkills,
            accompanied: this.state.accompanied,
            environmentId: parseInt(this.state.environmentId),
            therapyId: parseInt(this.state.therapyId),
            clientId: parseInt(this.state.clientId)
          };
          if (editedNote.accompanied === "true") { editedNote.accompanied = true }
          else (editedNote.accompanied = false)

    this.props
    .updateNote(editedNote)
    .then(() => this.props.history.push("/clients"))
    }

// when the component mounts, grab the matching note data from the database and setstate with that info
    componentDidMount() {
      NoteManager.getNote(this.props.match.params.noteId)
      .then(note => {
        this.setState({
            date: note.date,
            maladaptivePattern: note.maladaptivePattern,
            symptoms: note.symptoms,
            copingSkills: note.copingSkills,
            accompanied: note.accompanied,
            environmentId: note.environmentId,
            therapyId: note.therapyId,
            clientId: note.clientId,
            environment: "",
            therapy: ""
        });
      });
    }

// actual generation/rendering of the edit form
render() {

    console.log(this.props.match.params)
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
              value={this.state.date}
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
         <label><strong>Environment</strong></label>
          {this.props.environment.map(environments =>{

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
<label><strong>Therapy Addressed</strong></label>
          {this.props.therapy.map(therapies =>{

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
            onClick={this.updateExistingNote}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
