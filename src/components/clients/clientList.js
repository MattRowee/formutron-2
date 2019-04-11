import React, { Component } from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class ClientList extends Component {

  state = {
    clientItem: {},
    search: ""
  };
  //Handles modal visibility and sets specific entry to state for editing
  handleModal = client => {
    this.setState({
      showModal: true,
      clientItem: client
    });
  };
  //Handles search bar field change
  handleFieldChange = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };


  render() {

    let filteredClients = this.props.clients.filter(client => {
      return (
        client.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (

      <React.Fragment>
        <div className="search-bar">
          <input
            id="search"
            value={this.state.search}
            placeholder="Search clients by name..."
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="clientButton">
          <button type="button"
            className="btn btn-warning"
            onClick={() => {
              this.props.history.push("/clients/new")
            }
            }
          >
            Admit Client
                    </button>
        </div>
        <label>List of Clients</label>
        <section className="clients">

          {filteredClients.map(singleClient => {
            if (singleClient.userId === sessionStorage.getItem('credentials')) {
              return <ResourceCard key={singleClient.id} resource={singleClient} route="clients" />
            }
          }
          )}

        </section>

      </React.Fragment>
    )
  }
}




