import React, {Component} from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class NoteList extends Component {
  render() {
    return (
      <React.Fragment>

        <section className="notes">
            {this.props.notes.map(singleNote => {
              console.log(singleNote, singleNote.clientId, this.props.match.params.clientId)
              if(singleNote.clientId === parseInt(this.props.match.params.clientId))
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
              this.props.history.push(`/notes/new/${this.props.match.params.clientId}`)
            }
            }
            >
            Create Documentation
                    </button>
        </div>
        </React.Fragment>
        )}}