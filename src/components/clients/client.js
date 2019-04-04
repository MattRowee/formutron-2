import React, { Component } from "react";
import ClientDetail from "../clients/clientDetail";
import NoteList from "../notes/noteList";

export default class Client extends Component {
  render() {
    return (
      <React.Fragment>

        <ClientDetail
          {...this.props}

        />

        <NoteList
        {...this.props}
          clients={this.props.clients}
          notes={this.props.notes}
          addNote={this.props.addNote}

        />
      </React.Fragment>
    );
  }
}