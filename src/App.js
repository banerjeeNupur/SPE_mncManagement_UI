import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProjectList from "./components/ProjectList";
import ManagerDashboard from "./components/ManagerDashboard";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

class App extends Component{

    render(){
        return(
            <Router>
                <Route exact path='/' component={SignIn}>
                </Route>
                <Route exact path="/Login" component={Login}>
                </Route>

                <Route exact path="/ManagerDashboard" component={ManagerDashboard}>
                </Route>
                <Route exact path="/AdminDashboard" component={AdminDashboard}>
                </Route>
                {/*<Route exact path="/ExtendedStockView" component={ExtendedStockView}>*/}
                {/*</Route>*/}
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