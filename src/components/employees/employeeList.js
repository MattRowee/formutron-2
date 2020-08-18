import React, { Component } from 'react'
import ResourceCard from "../generics/ResourceCard";

export default class EmployeeList extends Component {

  render() {
    return (

      <React.Fragment>
       
        
        <label className="clientListLabel">Employee Directory</label>
        <section className="employees">
          {this.props.employees.map(singleEmployee => {
              console.log(singleEmployee)
             return  <ResourceCard key= {singleEmployee.id} resource={singleEmployee} route="employees"/>
            })}
        </section>

      </React.Fragment>
    )
  }
}


