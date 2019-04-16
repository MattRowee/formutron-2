import React, { Component } from 'react';

import PropTypes from 'prop-types'
export default class NoteDetail extends Component {
    render() {
        /*
            Using the route parameter, find the client that the
            user clicked on by looking at the `this.props.clients`
            collection that was passed down from ApplicationViews
        */

        // this finds the corresponding  (to notethe card you clicked on)
        // and pops up the corresponging detail card

        const note = this.props.notes.find(a => a.id ===
            parseInt(this.props.match.params.noteId)) || {}

        return (
            <section className="notes">

                <div key={note.id} className="card">
                    <div className="card-body">
                        <h6 className="card-title">Session date:
                            {note.date}
                        </h6>
                        <h6 className="card-title">
                            <b>{note.accompanied ? 'Client was accompanied' : "Unaccompanied session"}</b>
                        </h6>

                        <h6 className="card-title">Maladaptive pattern: {note.maladaptivePattern}</h6>
                        <h6 className="card-title">Symptom: {note.symptoms}</h6>
                        <h6 className="card-title">Coping skills: {note.copingSkills}</h6>

                        {this.props.environment.map(singleEnvironment => {
                            if (singleEnvironment.id === note.environmentId) { return <h6 className="card-title">Environment: {singleEnvironment.name}</h6> }
                        })}
                        {this.props.therapy.map(singleTherapy => {
                            if (singleTherapy.id === note.therapyId) {
                                return <h6
                                    className="card-title">Therapy: {singleTherapy.name}</h6>
                            }
                        })}

                        {/* a button which calls the delete function
                        then pushes the user to the animals route as a reset */}

                        <div className="clientButton">
                            <button type="button"
                                className="btn btn-warning"
                                onClick={() => this.props.deleteNote(note.id)
                                    .then(() => this.props.history.push("/clients"))}
                                >Delete</button>
                                </div>

                            {/* This button has a click event that pushes
                            the user to the edit route */}
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/notes/${note.id}/edit`);
                                }}
                            >
                                Edit
                        </button>
                        </div>
                    </div>
            </section>
                )
            }
        }

NoteDetail.propTypes = {
                    notes: PropTypes.arrayOf(PropTypes.object),
                deleteNote: PropTypes.object
}