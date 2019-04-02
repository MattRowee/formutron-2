import React, { Component } from "react";
import ClientDetail from "../clients/clientDetail";
// import ChatEdit from "../chat/chatEdit";
import NoteList from "../notes/noteList";

export default class Client extends Component {
  render() {
    return (
      <React.Fragment>

        <ClientDetail
          {...this.props}
          deleteClient={this.deleteClient}
        //   clients={this.state.clients} />
        />

        <NoteList
        {...this.props}
          notes={this.props.notes}
          addNote={this.props.addNote}

        />
      </React.Fragment>
    );
  }
}