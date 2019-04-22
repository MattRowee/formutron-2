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
                        <h5 className="card-title">Session date:
                           <h6> {note.date}</h6>
                        </h5>
                        <h6 className="card-title">
                            <b>{note.accompanied ? 'Client was accompanied' : "Unaccompanied session"}</b>
                        </h6>

                        <h5 className="card-title">Maladaptive pattern: <h6>{note.maladaptivePattern}</h6></h5>
                        <h5 className="card-title">Symptoms: <h6>{note.symptoms}</h6></h5>
                        <h5 className="card-title">Coping skills:<h6> {note.copingSkills}</h6></h5>

                        {this.props.environment.map(singleEnvironment => {
                            if (singleEnvironment.id === note.environmentId) { return <h5 className="card-title">Environment: <h6>{singleEnvironment.name}</h6></h5> }
                        })}
                        {this.props.therapy.map(singleTherapy => {
                            if (singleTherapy.id === note.therapyId) {
                                return <h5
                                    className="card-title">Therapy: <h6>{singleTherapy.name}</h6></h5>
                            }
                        })}

                        {/* a button which calls the delete function
                        then pushes the user to the animals route as a reset */}

                        <div className="clientButton">
                            <button type="button"
                                className="btn btn-danger"
                                onClick={() => this.props.deleteNote(note.id)
                                    .then(() => this.props.history.push("/clients"))}
                            >Delete</button>


                        {/* This button has a click event that pushes
                            the user to the edit route */}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => {
                                this.props.history.push(`/notes/${note.id}/edit`);
                            }}
                        >
                            Edit
                        </button>
                        </div>
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