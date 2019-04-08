import React, { Component } from "react";
import ClientDetail from "../clients/clientDetail";
import NoteList from "../notes/noteList";


// Because the note component is connected to individual clients, there routes are connected.
// Client JS allows us to render two seperate component functionalities in one route in AppViews.

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
          environment={this.props.environment}
          therapy={this.props.therapy}
        />
      </React.Fragment>
    );
  }
}