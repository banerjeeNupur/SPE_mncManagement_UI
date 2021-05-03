import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProjectList from "./components/ProjectList";
import ManagerDashboard from "./components/ManagerDashboard";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import LoginMid from "./components/LoginMid";
import Requests from "./components/Requests";
import MakeRequest from "./components/MakeRequest";

class App extends Component{

    render(){
        return(
            <Router>
                <Route exact path='/' component={Login}>
                </Route>
                <Route exact path="/Login" component={Login}>
                </Route>

                <Route exact path="/ManagerDashboard" component={ManagerDashboard}>
                </Route>
                <Route exact path="/AdminDashboard" component={AdminDashboard}>
                </Route>
                <Route exact path="/LoginMid" component={LoginMid}/>
                <Route exact path="/Requests" component={Requests}/>
                <Route exact path="/MakeRequest" component={MakeRequest}/>
                {/*</Route>
                {/*<Route exact path="/BuyStock" component={BuyStock}>*/}
                {/*</Route>*/}
                {/*<Route exact path="/Error404" component={Error404}>*/}
                {/*</Route>*/}
                {/*<Route exact path = "/GeneratePDF" component={GeneratePDF}>*/}
                {/*</Route>*/}
            </Router>
        )
    }
}

export default App;