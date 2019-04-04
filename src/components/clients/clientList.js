import React, { Component } from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class ClientList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="clients">

          {this.props.clients.map(singleClient => {
            if (singleClient.userId === sessionStorage.getItem('credentials')) {
              return <ResourceCard key={singleClient.id} resource={singleClient} route="clients" />
            }
          }
          )}

        </section>
        <div className="clientButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/clients/new")
            }
            }
          >
            Admit Client
                    </button>
        </div>
      </React.Fragment>
    )
  }
}




