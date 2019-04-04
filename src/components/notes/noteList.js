import React, {Component} from 'react'
import ResourceCard from "../generics/ResourceCard";
import Client from '../clients/client';

export default class NoteList extends Component {
  render() {
    return (
      <React.Fragment>

        <section className="notes">
            {this.props.notes.map(singleNote => {
            // {
              if(parseInt(singleNote.clientId) === parseInt(sessionStorage.getItem('clientCredentials')))
              // sessionStorage.getItem('credentials')
              {
             return  <ResourceCard key= {singleNote.id} resource={singleNote} route="notes"/>
              }

            })}

        </section>
        <div className="noteButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/notes/new")
            }
            }
            >
            Create Documentation
                    </button>
        </div>
        </React.Fragment>
        )}}