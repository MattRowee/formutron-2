import React, { Component } from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class EmployeeList extends Component {

  state = {
    employeeItem: {},
    search: ""
  };
  //Handles modal visibility and sets specific entry to state for editing
  handleModal = employee => {
    this.setState({
      showModal: true,
      employeeItem: employee
    });
  };
  //Handles search bar field change
//   handleFieldChange = evt => {
//     evt.preventDefault();
//     const stateToChange = {};
//     stateToChange[evt.target.id] = evt.target.value;
//     this.setState(stateToChange);
//   };


  render() {

    let filteredEmployees = this.props.employees.filter(employee => {
      return (
        client.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (

      <React.Fragment>
       
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
        <label className="clientListLabel">Employee Directory</label>
        <section className="clients">

          {filteredEmployees.map(singleEmployee => {
            if (singleEmployee.userId === sessionStorage.getItem('credentials')) {
              return <ResourceCard key={singleEmployee.id} resource={singleEmployee} route="employees" />
            }
          }
          )}

        </section>

      </React.Fragment>
    )
  }
}


