// import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// import auth0Client from "../authentication/Auth";

class NavBar extends Component {
 signOut = () => {
  //  auth0Client.signOut();
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
           <ul className="nav nav-pills">
           <li className="nav-item">
               <Link className="nav-link" to="/">
                 Home
               </Link>
             </li>
           </ul>
         </React.Fragment>
       
     </nav>
   );
 }
}

export default withRouter(NavBar);

