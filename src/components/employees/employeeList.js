import React, { Component } from 'react'
import EmployeeCard from "../generics/EmployeeCard";

export default class EmployeeList extends Component {

  render() {
    return (

      <React.Fragment>
       
        
        <label className="clientListLabel">Employee Directory</label>
        <section className="employees">
          {this.props.employees.map(singleEmployee => {
              console.log(singleEmployee)
             return  <EmployeeCard key= {singleEmployee.id} resource={singleEmployee} route="employees"/>
            })}
        </section>

      </React.Fragment>
    )
  }
}


