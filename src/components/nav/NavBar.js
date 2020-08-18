// import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends Component {
 signOut = () => {
   sessionStorage.clear()
   this.props.history.replace("/");
 };

 render() {
   return (
     <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
       <Link className="navbar-brand" to="/">
         Formutron
       </Link>
      
       
         <React.Fragment>
           <ul className="nav nav-pills">
           <li className="nav-item">
               <Link className="nav-link" to="/employees">
                 Employee Directory
               </Link>
             </li>
           </ul>
           <div>
             <button
               className="btn btn-danger"
               onClick={() => {
                 this.signOut();
               }}
             >
               Sign Out
             </button>
           </div>
         </React.Fragment>
       
     </nav>
   );
 }
}

export default withRouter(NavBar);

