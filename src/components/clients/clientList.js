import React, {Component} from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class ClientList extends Component {
  render() {
    return (
      <React.Fragment>
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
        <section className="clients">
            {this.props.clients.map(singleClient => (
              <ResourceCard key= {singleClient.id} resource={singleClient} route="clients"/>
            ))}

        </section>
        </React.Fragment>
        )}}