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
                        <h4 className="card-title">
                            {note.date}
                        </h4>
                        <h6 className="card-title">{note.maladaptivePattern}</h6>
                        <h6 className="card-title">{note.symptoms}</h6>
                        <h6 className="card-title">{note.copingSkills}</h6>
                        <h6 className="card-title">{note.accompanied}</h6>

                        {/* an anchor tag which calls the delete function
                        then pushes the user to the animals route as a reset */}

                        <a href="#"
                            onClick={() => this.props.deleteNote(note.id)
                                .then(() => this.props.history.push("/notes"))}
                            className="card-link">Delete</a>

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